import categoryService from '../services/category-services.js';

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;