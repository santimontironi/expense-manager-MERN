import { Router } from 'express';
import expenseController from '../controllers/expense-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';
import { verifyObjectId } from '../middlewares/verify-object-id.js';
import {createExpenseSchema, changeExpenseCategorySchema} from '../../shared/schemas/expense-schema.js';
import { validateBody } from '../middlewares/zod-validation.js';

export const router = Router();

router.post('/', verifyAuth, validateBody(createExpenseSchema), expenseController.createExpense);
router.get('/', verifyAuth, expenseController.getAllExpenses);
router.delete('/:id', verifyAuth, verifyObjectId, expenseController.deleteExpense);
router.patch('/:id/category', verifyAuth, verifyObjectId, validateBody(changeExpenseCategorySchema), expenseController.reassignCategory);