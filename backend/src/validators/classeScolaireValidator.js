import { body, param, query } from 'express-validator';

export const createClasseValidator = [
  body('nomClasse').trim().notEmpty().withMessage('Nom de la classe requis'),
  body('niveau').isIn(['Maternelle', 'Primaire']).withMessage('Niveau invalide'),
  body('anneeScolaire').trim().notEmpty().withMessage('Année scolaire requise'),
];

export const updateClasseValidator = [
  param('id').isUUID(4).withMessage('ID classe invalide'),
  body('nomClasse').optional().trim().notEmpty(),
  body('niveau').optional().isIn(['Maternelle', 'Primaire']),
  body('anneeScolaire').optional().trim().notEmpty(),
];

export const listClasseValidator = [
  query('niveau').optional().isIn(['Maternelle', 'Primaire']),
  query('anneeScolaire').optional().trim(),
];

export const idClasseValidator = [
  param('id').isUUID(4).withMessage('ID classe invalide'),
];

export const setEnseignantsValidator = [
  param('id').isUUID(4).withMessage('ID classe invalide'),
  body('idEnseignants').isArray().withMessage('idEnseignants doit être un tableau'),
  body('idEnseignants.*').isUUID(4).withMessage('ID enseignant invalide'),
];
