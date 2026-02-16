import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, registerValidator } from '../validators/utilisateurValidator.js';

const router = Router();

router.post('/login', loginValidator, validate, authController.login);
router.post('/register', registerValidator, validate, authController.register);
router.get('/me', authenticate, authController.me);

export default router;
