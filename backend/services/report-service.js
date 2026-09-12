import reportRepository from "../repositories/report-repository.js"

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

            // Se guarda como string "YYYY-MM-DD" (los primeros 10 caracteres del ISO), con contadores en 0.
            days.push({ date: date.toISOString().slice(0, 10), count: 0, total: 0 })
        }

        // Se recorre cada gasto real traído de la base.
        for (const expense of expenses) {

            // Se saca el "YYYY-MM-DD" de ese gasto, para poder matchearlo con el day.date correspondiente.
            const key = expense.createdAt.toISOString().slice(0, 10)

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
}

const reportService = new ReportService()
export default reportService
