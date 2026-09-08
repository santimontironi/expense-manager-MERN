import expenseService from "../services/expense-service.js"

class ExpenseController {
    async createExpense(req, res) {
        try {
            const { categoryId, amount, description, paymentMethod } = req.body;
            const expense = await expenseService.createExpense(categoryId, amount, description, paymentMethod);
            res.status(201).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async getAllExpenses(req, res) {
        try {
            const expenses = await expenseService.getAllExpenses();
            res.status(200).json(expenses);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const expenseController = new ExpenseController();
export default expenseController