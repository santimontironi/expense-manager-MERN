import { Router } from 'express';
import categoryController from '../controllers/category-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';
import { createCategorySchema } from '../../shared/schemas/category-schema.js';
import { validateBody } from '../middlewares/zod-validation.js';

export const router = Router();

router.get('/', verifyAuth, categoryController.getAllCategories);
router.get('/:id', verifyAuth, categoryController.getCategoryById);
router.post('/', verifyAuth, validateBody(createCategorySchema), categoryController.addCategory);
router.delete('/:id', verifyAuth, categoryController.deleteCategory)