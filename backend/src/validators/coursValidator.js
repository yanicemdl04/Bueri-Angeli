import { body, param } from 'express-validator';

export const createCoursValidator = [
  body('nomCours').trim().notEmpty().withMessage('Nom du cours requis'),
  body('ponderation').optional().isInt({ min: 1 }).withMessage('Pondération >= 1'),
];

export const updateCoursValidator = [
  param('id').isUUID(4).withMessage('ID cours invalide'),
  body('nomCours').optional().trim().notEmpty(),
  body('ponderation').optional().isInt({ min: 1 }),
];

export const idCoursValidator = [
  param('id').isUUID(4).withMessage('ID cours invalide'),
];
