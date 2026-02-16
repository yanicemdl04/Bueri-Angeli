import { Router } from 'express';
import { utilisateurController } from '../controllers/utilisateurController.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createUtilisateurValidator,
  updateUtilisateurValidator,
  idUtilisateurValidator,
} from '../validators/utilisateurValidator.js';

const router = Router();

router.use(authenticate, adminOnly);

router.get('/', utilisateurController.list);
router.post('/', createUtilisateurValidator, validate, utilisateurController.create);
router.get('/:id', idUtilisateurValidator, validate, utilisateurController.getById);
router.patch('/:id', updateUtilisateurValidator, validate, utilisateurController.update);
router.delete('/:id', idUtilisateurValidator, validate, utilisateurController.delete);

export default router;
