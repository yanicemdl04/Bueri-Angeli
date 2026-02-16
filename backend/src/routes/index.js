import { Router } from 'express';
import authRoutes from './authRoutes.js';
import utilisateurRoutes from './utilisateurRoutes.js';
import eleveRoutes from './eleveRoutes.js';
import classeScolaireRoutes from './classeScolaireRoutes.js';
import enseignantRoutes from './enseignantRoutes.js';
import evaluationRoutes from './evaluationRoutes.js';
import coursRoutes from './coursRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/utilisateurs', utilisateurRoutes);
router.use('/eleves', eleveRoutes);
router.use('/classes', classeScolaireRoutes);
router.use('/enseignants', enseignantRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/cours', coursRoutes);
router.use('/notifications', notificationRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
