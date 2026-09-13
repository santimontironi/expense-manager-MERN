import expenseRepository from "../repositories/expense-repository.js"
import categoryRepository from "../repositories/category-repository.js"

class ExpenseService {
    async createExpense(expenseData) {
        const category = await categoryRepository.findNameById(expenseData.categoryId)
        if (!category) {
            const error = new Error('Categoría no encontrada')
            error.status = 404
            throw error
        }

        return await expenseRepository.createExpense(expenseData, category.name)
    }

    async getAllExpenses() {
        return await expenseRepository.findAllExpenses()
    }

    async deleteExpense(id) {

        const expense = await expenseRepository.findById(id)
        if (!expense) {
            const error = new Error('Gasto no encontrado')
            error.status = 404
            throw error
        }

        return await expenseRepository.deleteExpense(id)
    }
}

const expenseService = new ExpenseService()
export default expenseService