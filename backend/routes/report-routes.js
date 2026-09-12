import { Router } from 'express';
import reportController from '../controllers/report-controller.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const router = Router();

router.get('/last-week', verifyAuth, reportController.getLastWeekReport);
