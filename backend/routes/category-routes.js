import { Router } from 'express';
import categoryController from '../controllers/category-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';
import { createCategorySchema, editCategorySchema } from '../../shared/schemas/category-schema.js';
import { validateBody } from '../middlewares/zod-validation.js';

export const router = Router();

router.get('/', verifyAuth, categoryController.getAllCategories);
router.get('/:id', verifyAuth, categoryController.getCategoryById);
router.post('/', verifyAuth, validateBody(createCategorySchema), categoryController.addCategory);
router.patch('/:id', verifyAuth, validateBody(editCategorySchema), categoryController.editCategory);
router.delete('/:id', verifyAuth, categoryController.deleteCategory)