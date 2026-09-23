import { Router } from 'express';
import reportController from '../controllers/report-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const router = Router();

router.get('/last-week', verifyAuth, reportController.getLastWeekReport);
router.get('/monthly', verifyAuth, reportController.getMonthlyExpensesReport);
router.get('/top-expenses', verifyAuth, reportController.getTopExpensesReport);
router.get('/category-breakdown', verifyAuth, reportController.getCategoryBreakdownReport);
router.get('/category-limits', verifyAuth, reportController.getCategoryLimitStatus);
