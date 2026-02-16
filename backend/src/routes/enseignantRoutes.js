import { Router } from 'express';
import { enseignantController } from '../controllers/enseignantController.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly, enseignantOrAdmin } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createEnseignantValidator,
  updateEnseignantValidator,
  idEnseignantValidator,
} from '../validators/enseignantValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', enseignantController.list);
router.get('/me', enseignantController.getByMe);
router.post('/', adminOnly, createEnseignantValidator, validate, enseignantController.create);
router.get('/:id', idEnseignantValidator, validate, enseignantController.getById);
router.patch('/:id', adminOnly, updateEnseignantValidator, validate, enseignantController.update);
router.delete('/:id', adminOnly, idEnseignantValidator, validate, enseignantController.delete);

export default router;
