import { Router } from 'express';
import { classeScolaireController } from '../controllers/classeScolaireController.js';
import { authenticate } from '../middleware/auth.js';
import { enseignantOrAdmin } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createClasseValidator,
  updateClasseValidator,
  listClasseValidator,
  idClasseValidator,
  setEnseignantsValidator,
} from '../validators/classeScolaireValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', listClasseValidator, validate, classeScolaireController.list);
router.post('/', enseignantOrAdmin, createClasseValidator, validate, classeScolaireController.create);
router.get('/:id', idClasseValidator, validate, classeScolaireController.getById);
router.patch('/:id', enseignantOrAdmin, updateClasseValidator, validate, classeScolaireController.update);
router.put(
  '/:id/enseignants',
  enseignantOrAdmin,
  setEnseignantsValidator,
  validate,
  classeScolaireController.setEnseignants
);
router.delete('/:id', enseignantOrAdmin, idClasseValidator, validate, classeScolaireController.delete);

export default router;
