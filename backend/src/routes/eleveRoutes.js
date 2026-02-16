import { Router } from 'express';
import { eleveController } from '../controllers/eleveController.js';
import { authenticate } from '../middleware/auth.js';
import { enseignantOrAdmin } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createEleveValidator,
  updateEleveValidator,
  listEleveValidator,
  idEleveValidator,
} from '../validators/eleveValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', listEleveValidator, validate, eleveController.list);
router.post('/', enseignantOrAdmin, createEleveValidator, validate, eleveController.create);
router.get('/:id', idEleveValidator, validate, eleveController.getById);
router.get('/:id/moyenne', idEleveValidator, validate, eleveController.getMoyenne);
router.patch('/:id', enseignantOrAdmin, updateEleveValidator, validate, eleveController.update);
router.patch('/:id/risques', enseignantOrAdmin, idEleveValidator, validate, eleveController.updateRisquesDecrochage);
router.delete('/:id', enseignantOrAdmin, idEleveValidator, validate, eleveController.delete);

export default router;
