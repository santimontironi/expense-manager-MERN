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

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async addCategory(req, res) {
        try {
            const { name, color } = req.body;
            const newCategory = await categoryService.createCategory(name, color);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;