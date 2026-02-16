import { body, param, query } from 'express-validator';

export const createEvaluationValidator = [
  body('valeur').isFloat({ min: 0, max: 100 }).withMessage('Valeur entre 0 et 100'),
  body('type').isIn(['Interrogation', 'Examen']).withMessage('Type invalide'),
  body('date').isISO8601().withMessage('Date invalide'),
  body('idEleve').isUUID(4).withMessage('ID élève invalide'),
  body('idCours').isUUID(4).withMessage('ID cours invalide'),
];

export const updateEvaluationValidator = [
  param('id').isUUID(4).withMessage('ID note invalide'),
  body('valeur').optional().isFloat({ min: 0, max: 100 }),
  body('type').optional().isIn(['Interrogation', 'Examen']),
  body('date').optional().isISO8601(),
  body('idEleve').optional().isUUID(4),
  body('idCours').optional().isUUID(4),
];

export const listEvaluationValidator = [
  query('idEleve').optional().isUUID(4),
  query('idCours').optional().isUUID(4),
  query('idClasse').optional().isUUID(4),
  query('type').optional().isIn(['Interrogation', 'Examen']),
];

export const idEvaluationValidator = [
  param('id').isUUID(4).withMessage('ID note invalide'),
];
