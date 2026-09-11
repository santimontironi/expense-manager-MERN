import {Expense} from "../models/expense-model.js";

class ExpenseRepository {
    async createExpense(categoryId, amount, description, paymentMethod, categorySnapshot) {
        const expense = await Expense.create({ categoryId, amount, description, paymentMethod, categorySnapshot });
        return await expense.populate('categoryId', 'name');
    }

    async findAllExpenses() {
        return await Expense.find().populate('categoryId', 'name').sort({ createdAt: -1 });
    }

}

const expenseRepository = new ExpenseRepository();
export default expenseRepository