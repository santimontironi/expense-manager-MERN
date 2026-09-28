import expenseService from "../services/expense-service.js"

class ExpenseController {
    async createExpense(req, res) {
        try {
            const expense = await expenseService.createExpense(req.user.id, req.body);
            res.status(201).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async getAllExpenses(req, res) {
        try {
            const expenses = await expenseService.getAllExpenses(req.user.id);
            res.status(200).json(expenses);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async deleteExpense(req, res) {
        try {
            const { id } = req.params;
            const expense = await expenseService.deleteExpense(id, req.user.id);
            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async reassignCategory(req, res) {
        try {
            const { id } = req.params;
            const { categoryId } = req.body;
            const expense = await expenseService.reassignCategory(id, req.user.id, categoryId);
            res.status(200).json(expense);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const expenseController = new ExpenseController();
export default expenseController
