import expenseRepository from "../repositories/expense-repository.js"
import categoryRepository from "../repositories/category-repository.js"

class ExpenseService {
    async createExpense(userId, expenseData) {
        const category = await categoryRepository.findNameById(expenseData.categoryId, userId)
        if (!category) {
            const error = new Error('Categoría no encontrada')
            error.status = 404
            throw error
        }

        return await expenseRepository.createExpense(userId, expenseData, category.name)
    }

    async getAllExpenses(userId) {
        return await expenseRepository.findAllExpenses(userId)
    }

    async deleteExpense(id, userId) {

        const expense = await expenseRepository.findById(id, userId)
        if (!expense) {
            const error = new Error('Gasto no encontrado')
            error.status = 404
            throw error
        }

        return await expenseRepository.deleteExpense(id, userId)
    }
}

const expenseService = new ExpenseService()
export default expenseService
