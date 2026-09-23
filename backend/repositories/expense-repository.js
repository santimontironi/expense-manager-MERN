import {Expense} from "../models/expense-model.js";

class ExpenseRepository {
    async createExpense(userId, expenseData, categorySnapshot) {
        const expense = await Expense.create({ ...expenseData, userId, categorySnapshot });
        return await expense.populate('categoryId', 'name');
    }

    async findAllExpenses(userId) {
        return await Expense.find({ userId }).populate('categoryId', 'name').sort({ createdAt: -1 });
    }

    async findById(id, userId) {
        return await Expense.findOne({ _id: id, userId }).populate('categoryId', 'name');
    }

    async deleteExpense(id, userId) {
        return await Expense.findOneAndDelete({ _id: id, userId }).populate('categoryId', 'name');
    }

}

const expenseRepository = new ExpenseRepository();
export default expenseRepository
