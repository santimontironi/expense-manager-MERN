import reportRepository from "../repositories/report-repository.js"
import categoryRepository from "../repositories/category-repository.js"
import { toLocalDateKey } from "../utils/date-utils.js"

// Cuántos días abarca el reporte. Constante para no repetir el número "7" suelto en el código.
const DAYS_IN_WEEK_REPORT = 7

class ReportService {
    async getLastWeekReport() {

        // Fecha y hora actuales.
        const today = new Date()

        // Se lleva a medianoche para poder comparar por día, ignorando la hora exacta.
        today.setHours(0, 0, 0, 0)

        // Copia de "today" (si no se copia, setDate() de la línea siguiente modificaría "today" también).
        const fromDate = new Date(today)

        // Retrocede 6 días desde hoy → "fromDate" queda en el primer día del rango de 7 (hoy inclusive).
        fromDate.setDate(fromDate.getDate() - (DAYS_IN_WEEK_REPORT - 1))

        // Trae de la base todos los gastos con createdAt >= fromDate.
        const expenses = await reportRepository.findExpensesSince(fromDate)

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

    async getCategoryLimitStatus() {

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
        const categories = await categoryRepository.findAll()

        // Trae, para cada categoryId que tuvo gastos desde monthStart, la
        // suma de amount de ese mes. Ver sumExpensesByCategorySince.
        const monthlySums = await reportRepository.sumExpensesByCategorySince(monthStart)

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
