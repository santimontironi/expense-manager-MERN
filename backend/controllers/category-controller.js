import categoryService from '../services/category-services.js';

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories(req.user.id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id, req.user.id);
            res.status(200).json(category);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.deleteCategory(id, req.user.id);
            res.status(200).json(category);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async editCategory(req,res){
        try{
            const { id } = req.params
            const { name, color, spendingLimit } = req.body
            const categoryEdited = await categoryService.editCategory(id, req.user.id, name, color, spendingLimit)
            return res.status(200).json(categoryEdited)

        }catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async addCategory(req, res) {
        try {
            const { name, color, spendingLimit } = req.body;
            const newCategory = await categoryService.createCategory(req.user.id, name, color, spendingLimit);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }

    async updateSpendingLimit(req, res) {
        try {
            const { id } = req.params;
            const { spendingLimit } = req.body;
            const category = await categoryService.updateSpendingLimit(id, spendingLimit);
            res.status(200).json(category);
        } catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;
