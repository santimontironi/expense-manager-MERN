import { Router } from 'express';
import authController from '../controllers/auth-controller.js';
import { validateBody } from '../middlewares/zod-validation.js';
import { verifyAuth } from '../middlewares/verify-auth.js';
import { loginSchema } from 'shared/schemas/auth-schema.js';

const router = Router();

router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', verifyAuth, authController.me);

export default router;
