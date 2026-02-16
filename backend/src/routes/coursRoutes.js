import { Router } from 'express';
import { coursController } from '../controllers/coursController.js';
import { authenticate } from '../middleware/auth.js';
import { enseignantOrAdmin } from '../middleware/rbac.js';
import { validate } from '../middleware/validate.js';
import {
  createCoursValidator,
  updateCoursValidator,
  idCoursValidator,
} from '../validators/coursValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', coursController.list);
router.post('/', enseignantOrAdmin, createCoursValidator, validate, coursController.create);
router.get('/:id', idCoursValidator, validate, coursController.getById);
router.patch('/:id', enseignantOrAdmin, updateCoursValidator, validate, coursController.update);
router.delete('/:id', enseignantOrAdmin, idCoursValidator, validate, coursController.delete);

export default router;
