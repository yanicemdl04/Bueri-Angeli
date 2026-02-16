import { body, param, query } from 'express-validator';

export const createNotificationValidator = [
  body('titre').trim().notEmpty().withMessage('Titre requis'),
  body('message').trim().notEmpty().withMessage('Message requis'),
  body('idUtilisateur').isUUID(4).withMessage('ID utilisateur invalide'),
];

export const idNotificationValidator = [
  param('id').isUUID(4).withMessage('ID notification invalide'),
];

export const listNotificationValidator = [
  query('nonLuesOnly').optional().isBoolean(),
];
