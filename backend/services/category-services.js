import categoryRepository from '../repositories/category-repository.js';

class CategoryService {

    async getAllCategories(userId) {
        const categories = await categoryRepository.findAll(userId);

        return categories;
    }

    async getCategoryById(id, userId) {
        const result = await categoryRepository.findById(id, userId);
        if (!result) {
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        return result;
    }

    async createCategory(userId, name, color, spendingLimit) {
        const newCategory = await categoryRepository.createCategory(userId, name, color, spendingLimit);
        return newCategory;
    }

    async editCategory(id, userId, name, color, spendingLimit) {
        const category = await categoryRepository.findById(id, userId);
        if (!category) {
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        return await categoryRepository.editCategory(id, userId, name, color, spendingLimit);
    }

    async deleteCategory(id, userId){
        const categoryNotFounded = await categoryRepository.findById(id, userId)

        if(!categoryNotFounded){
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        const categoryDeleted = await categoryRepository.deleteCategory(id, userId)

        return categoryDeleted
    }

}

const categoryService = new CategoryService();
export default categoryService;
