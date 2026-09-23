import reportRepository from "../repositories/report-repository.js"
import categoryRepository from "../repositories/category-repository.js"
import { toLocalDateKey, toLocalMonthKey } from "../utils/date-utils.js"
import { DAYS_IN_WEEK_REPORT, MONTHS_IN_REPORT, DELETED_CATEGORY_COLOR } from "../utils/consts.js"

class ReportService {
    async getLastWeekReport(userId) {

        // Fecha y hora actuales.
        const today = new Date()

        // Se lleva a medianoche para poder comparar por día, ignorando la hora exacta.
        today.setHours(0, 0, 0, 0)

        // Copia de "today" (si no se copia, setDate() de la línea siguiente modificaría "today" también).
        const fromDate = new Date(today)

        // Retrocede 6 días desde hoy → "fromDate" queda en el primer día del rango de 7 (hoy inclusive).
        fromDate.setDate(fromDate.getDate() - (DAYS_IN_WEEK_REPORT - 1))

        // Trae de la base todos los gastos con createdAt >= fromDate.
        const expenses = await reportRepository.findExpensesSince(userId, fromDate)

        // Acá se va a armar la lista de los 7 días, cada uno arrancando en 0.
        const days = []

        for (let i = 0; i < DAYS_IN_WEEK_REPORT; i++) {

            // Copia de fromDate para no mutarlo en cada vuelta del loop.
            const date = new Date(fromDate)

            // Día i-ésimo del rango: fromDate + 0, fromDate + 1, ..., fromDate + 6.
            date.setDate(date.getDate() + i)

            // Se guarda como string "YYYY-MM-DD" en hora local, con contadores en 0.
            days.push({ date: toLocalDateKey(date), count: 0, total: 0 })
        }

        // Se recorre cada gasto real traído de la base.
        for (const expense of expenses) {

            // Se saca el "YYYY-MM-DD" (en hora local) de ese gasto, para poder matchearlo con el day.date correspondiente.
            const key = toLocalDateKey(expense.createdAt)

            // Busca en "days" el objeto del día que tenga esa misma fecha.
            const day = days.find(d => d.date === key)
            if (day) {

                // Suma uno al contador de gastos de ese día.
                day.count += 1

                // Suma el monto del gasto al total de ese día.
                day.total += expense.amount
            }
        }

        // Array de 7 objetos { date, count, total }, con los días sin gastos en 0.
        return days
    }

    async getMonthlyExpensesReport(userId) {

        // Primer día del mes actual: el mes en curso no entra en el gráfico
        // (no cerró todavía), pero sirve como límite superior (exclusivo)
        // del rango de meses completos.
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)

        // Retrocede MONTHS_IN_REPORT meses desde el inicio del mes actual →
        // primer día del rango de meses completos a mostrar.
        const fromDate = new Date(currentMonthStart)
        fromDate.setMonth(fromDate.getMonth() - MONTHS_IN_REPORT)

        // Gastos de los meses completos (rango [fromDate, currentMonthStart)).
        const expenses = await reportRepository.findExpensesInRange(userId, fromDate, currentMonthStart)

        // Gastos del mes en curso, aparte del gráfico (ver criterio de aceptación en spec.md).
        const currentMonthExpenses = await reportRepository.findExpensesSince(userId, currentMonthStart)

        // Arranca los MONTHS_IN_REPORT meses del gráfico en 0, mismo criterio que los días de la semana.
        const months = []
        for (let i = 0; i < MONTHS_IN_REPORT; i++) {
            const date = new Date(fromDate)
            date.setMonth(date.getMonth() + i)
            months.push({ month: toLocalMonthKey(date), count: 0 })
        }

        for (const expense of expenses) {
            const key = toLocalMonthKey(expense.createdAt)
            const month = months.find(m => m.month === key)
            if (month) {
                month.count += 1
            }
        }

        return {
            months,
            currentMonthCount: currentMonthExpenses.length,
        }
    }

    async getTopExpensesReport(userId) {
        const expenses = await reportRepository.findTopExpenses(userId)
        const categories = await categoryRepository.findAll(userId)

        const categoryNameById = new Map( //diccionario de todas las categorias y sus nombres
            categories.map(category => [category._id.toString(), category.name])
        )

        return expenses.map(expense => ({
            id: expense._id,
            name: expense.name,
            amount: expense.amount,
            date: toLocalDateKey(expense.createdAt),
            category: expense.categorySnapshot,
            // null when the category was deleted.
            currentCategory: categoryNameById.get(expense.categoryId.toString()) ?? null, //se busca el nombre de la categoria actual en el diccionario
        }))
    }

    async getCategoryBreakdownReport(userId) {
        // Una sola agregación (sin filtro de fecha) alcanza para los reportes
        // 3 y 4: ambos agrupan por categoryId sobre todo el histórico, uno
        // mira "total" (dinero) y el otro "count" (cantidad de gastos).
        const groups = await reportRepository.sumAndCountExpensesByCategory(userId)
        const categories = await categoryRepository.findAll(userId)

        const categoryById = new Map(
            categories.map(category => [category._id.toString(), category])
        )

        return groups.map(group => {
            const category = categoryById.get(group._id.toString())

            return {
                categoryId: group._id,
                name: category ? category.name : group.categorySnapshot,
                color: category ? category.color : DELETED_CATEGORY_COLOR,
                deleted: !category,
                amount: group.total,
                count: group.count,
            }
        })
    }

    async getCategoryLimitStatus(userId) {

        // Fecha y hora actuales.
        const now = new Date()

        // new Date(año, mes, día) arma una fecha directamente en ese día a
        // medianoche (00:00:00) — a diferencia de setHours, acá no hace falta
        // pisarla aparte porque el constructor ya la crea así.
        // getMonth() da el mes actual (0 = enero, 11 = diciembre) y "1" como
        // día arma el primer día de ese mes.
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

        // Trae todas las categorías que existen hoy, cada una con su
        // spendingLimit (findAll también agrega expenseCount, pero acá no
        // se usa, no molesta).
        const categories = await categoryRepository.findAll(userId)

        // Trae, para cada categoryId que tuvo gastos desde monthStart, la
        // suma de amount de ese mes. Ver sumExpensesByCategorySince.
        const monthlySums = await reportRepository.sumExpensesByCategorySince(userId, monthStart)

        // monthlySums es un array de { _id: categoryId, total }. Se convierte
        // a un Map (categoryId como string -> total) para poder buscar el
        // total de una categoría puntual sin recorrer el array cada vez.
        const monthSpentByCategory = new Map(
            monthlySums.map(sum => [sum._id.toString(), sum.total])
        )

        // Se recorre cada categoría existente para armar su estado de límite.
        return categories.map(category => {

            // Busca en el Map el total gastado por esta categoría este mes.
            // Si la categoría no tuvo gastos este mes, no está en el Map,
            // .get() devuelve undefined, y el "|| 0" lo deja en 0.
            const monthSpent = monthSpentByCategory.get(category._id.toString()) || 0

            // Devuelve el objeto que va a consumir el frontend para esta categoría.
            return {
                categoryId: category._id, // id de la categoría, para poder editar su límite después
                name: category.name, // nombre actual de la categoría
                spendingLimit: category.spendingLimit, // límite mensual configurado
                monthSpent, // cuánto lleva gastado este mes
                overLimit: monthSpent >= category.spendingLimit, // true si ya llegó o se pasó del límite
            }
        })
    }
}

const reportService = new ReportService()
export default reportService
