import { Router } from 'express';
import { notificationController } from '../controllers/notificationController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  createNotificationValidator,
  idNotificationValidator,
  listNotificationValidator,
} from '../validators/notificationValidator.js';

const router = Router();

router.get('/me', authenticate, listNotificationValidator, validate, notificationController.listMine);
router.post('/mark-all-read', authenticate, notificationController.markAllAsRead);

router.post('/', authenticate, createNotificationValidator, validate, notificationController.create);
router.get('/:id', authenticate, idNotificationValidator, validate, notificationController.getById);
router.patch('/:id/read', authenticate, idNotificationValidator, validate, notificationController.markAsRead);
router.delete('/:id', authenticate, idNotificationValidator, validate, notificationController.delete);

export default router;
