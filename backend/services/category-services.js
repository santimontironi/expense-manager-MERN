import categoryRepository from '../repositories/category-repository.js';

class CategoryService {

    async getAllCategories() {
        const categories = await categoryRepository.findAll();

        return categories;
    }

    async getCategoryById(id) {
        const result = await categoryRepository.findById(id);
        if (!result) {
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        return result;
    }

    async createCategory(name, color, spendingLimit) {
        const newCategory = await categoryRepository.createCategory(name, color, spendingLimit);
        return newCategory;
    }

    async editCategory(id, name, color, spendingLimit) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        return await categoryRepository.editCategory(id, name, color, spendingLimit);
    }

    async deleteCategory(id){
        const categoryNotFounded = await categoryRepository.findById(id)

        if(!categoryNotFounded){
            const error = new Error('Categoría no encontrada');
            error.status = 404;
            throw error;
        }

        const categoryDeleted = await categoryRepository.deleteCategory(id)

        return categoryDeleted
    }

}

const categoryService = new CategoryService();
export default categoryService;