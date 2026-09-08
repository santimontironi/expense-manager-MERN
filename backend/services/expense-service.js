import expenseRepository from "../repositories/expense-repository.js"
import categoryRepository from "../repositories/category-repository.js"

class ExpenseService {
    async createExpense(categoryId, amount, description, paymentMethod) {
        const category = await categoryRepository.findNameById(categoryId)
        if (!category) {
            const error = new Error('Categoría no encontrada')
            error.status = 404
            throw error
        }

        return await expenseRepository.createExpense(categoryId, amount, description, paymentMethod, category.name)
    }

    async getAllExpenses() {
        return await expenseRepository.findAllExpenses()
    }
}

const expenseService = new ExpenseService()
export default expenseService