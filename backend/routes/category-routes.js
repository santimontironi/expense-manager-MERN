import { Router } from 'express';
import categoryController from '../controllers/category-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const router = Router();

router.get('/', verifyAuth, categoryController.getAllCategories);