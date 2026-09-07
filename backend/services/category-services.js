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

    async createCategory(name, color) {
        const newCategory = await categoryRepository.createCategory(name, color);
        return newCategory;
    }

}

const categoryService = new CategoryService();
export default categoryService;