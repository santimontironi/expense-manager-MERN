import { Expense } from "../models/expense-model.js";

class ReportRepository {
    async findExpensesSince(fromDate) {
        return await Expense.find({ createdAt: { $gte: fromDate } });
    }

    async sumExpensesByCategorySince(fromDate) {
        // aggregate() ejecuta un pipeline: una serie de pasos que van
        // transformando los documentos de la colección, uno después del otro.
        return await Expense.aggregate([

            // $match filtra documentos, como un WHERE en SQL. Acá se queda
            // solo con los gastos cuyo createdAt sea >= fromDate.
            // $gte significa "mayor o igual que".
            { $match: { createdAt: { $gte: fromDate } } },

            // $group junta los documentos que quedaron en baldes según el
            // valor de "_id" (acá, categoryId: un balde por cada categoría
            // distinta) y calcula un acumulador por balde. $sum suma el
            // "amount" de todos los documentos de cada balde.
            { $group: { _id: "$categoryId", total: { $sum: "$amount" } } },
        ]);
    }
}

const reportRepository = new ReportRepository();
export default reportRepository
