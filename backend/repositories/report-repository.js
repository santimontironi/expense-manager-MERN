import mongoose from "mongoose";
import { Expense } from "../models/expense-model.js";

class ReportRepository {
    async findExpensesSince(userId, fromDate) {
        return await Expense.find({ userId, createdAt: { $gte: fromDate } });
    }

    async findExpensesInRange(userId, fromDate, toDate) {
        return await Expense.find({ userId, createdAt: { $gte: fromDate, $lt: toDate } }); //lt es menor que
    }

    async findTopExpenses(userId) {
        return await Expense.find({ userId }).sort({ amount: -1, createdAt: -1 }).limit(10);
    }

    async sumAndCountExpensesByCategory(userId) {
        // $sort antes del $group: dentro de cada balde, $first toma el
        // categorySnapshot del gasto más reciente (createdAt -1), para tener
        // un nombre de referencia si la categoría fue borrada.
        return await Expense.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: "$categoryId",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 },
                    categorySnapshot: { $first: "$categorySnapshot" },
                },
            },
        ]);
    }

    async sumExpensesByCategorySince(userId, fromDate) {
        // aggregate() ejecuta un pipeline: una serie de pasos que van
        // transformando los documentos de la colección, uno después del otro.
        return await Expense.aggregate([

            // $match filtra documentos, como un WHERE en SQL. Acá se queda
            // solo con los gastos del usuario cuyo createdAt sea >= fromDate.
            // $gte significa "mayor o igual que". aggregate() no castea tipos
            // como find(), por eso hay que convertir el userId a ObjectId a mano.
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: fromDate } } },

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
