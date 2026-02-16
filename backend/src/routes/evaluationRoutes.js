import { Router } from 'express';
import { evaluationController } from '../controllers/evaluationController.js';
import { authenticate } from '../middleware/auth.js';
import { enseignantOrAdmin } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createEvaluationValidator,
  updateEvaluationValidator,
  listEvaluationValidator,
  idEvaluationValidator,
} from '../validators/evaluationValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', listEvaluationValidator, validate, evaluationController.list);
router.post('/', enseignantOrAdmin, createEvaluationValidator, validate, evaluationController.create);
router.get('/:id', idEvaluationValidator, validate, evaluationController.getById);
router.patch('/:id', enseignantOrAdmin, updateEvaluationValidator, validate, evaluationController.update);
router.delete('/:id', enseignantOrAdmin, idEvaluationValidator, validate, evaluationController.delete);

export default router;
