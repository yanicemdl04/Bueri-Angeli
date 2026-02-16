import { body, param, query } from 'express-validator';

export const createEleveValidator = [
  body('nom').trim().notEmpty().withMessage('Nom requis'),
  body('prenom').trim().notEmpty().withMessage('Prénom requis'),
  body('dateNaissance').isISO8601().withMessage('Date de naissance invalide'),
  body('sexe').trim().notEmpty().withMessage('Sexe requis'),
  body('adresse').optional().trim(),
  body('idClasse').isUUID(4).withMessage('Classe invalide'),
  body('risquesDecrochage').optional().isFloat({ min: 0, max: 1 }),
];

export const updateEleveValidator = [
  param('id').isUUID(4).withMessage('ID élève invalide'),
  body('nom').optional().trim().notEmpty(),
  body('prenom').optional().trim().notEmpty(),
  body('dateNaissance').optional().isISO8601(),
  body('sexe').optional().trim().notEmpty(),
  body('adresse').optional().trim(),
  body('idClasse').optional().isUUID(4),
  body('risquesDecrochage').optional().isFloat({ min: 0, max: 1 }),
];

export const listEleveValidator = [
  query('idClasse').optional().isUUID(4),
  query('search').optional().trim(),
  query('risquesDecrochageMin').optional().isFloat({ min: 0, max: 1 }),
];

export const idEleveValidator = [
  param('id').isUUID(4).withMessage('ID élève invalide'),
];
