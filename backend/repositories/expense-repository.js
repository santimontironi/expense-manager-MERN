import {Expense} from "../models/expense-model.js";

class ExpenseRepository {
    async createExpense(expenseData, categorySnapshot) {
        const expense = await Expense.create({ ...expenseData, categorySnapshot });
        return await expense.populate('categoryId', 'name');
    }

    async findAllExpenses() {
        return await Expense.find().populate('categoryId', 'name').sort({ createdAt: -1 });
    }

    async findById(id) {
        return await Expense.findById(id).populate('categoryId', 'name');
    }

    async deleteExpense(id) {
        return await Expense.findByIdAndDelete(id).populate('categoryId', 'name');
    }

}

const expenseRepository = new ExpenseRepository();
export default expenseRepository