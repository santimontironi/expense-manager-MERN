import categoryRepository from '../repositories/category-repository.js';

class CategoryService {

    async getAllCategories() {
        const categories = await categoryRepository.findAll();

        return categories;
    }

}

const categoryService = new CategoryService();
export default categoryService;