import { Router } from 'express';
import expenseController from '../controllers/expense-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';
import {createExpenseSchema} from '../../shared/schemas/expense-schema.js';
import { validateBody } from '../middlewares/zod-validation.js';

export const router = Router();

router.post('/', verifyAuth, validateBody(createExpenseSchema), expenseController.createExpense);
router.get('/', verifyAuth, expenseController.getAllExpenses);
router.delete('/:id', verifyAuth, expenseController.deleteExpense);