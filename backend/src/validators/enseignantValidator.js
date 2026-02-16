import { body, param } from 'express-validator';

export const createEnseignantValidator = [
  body('specialite').trim().notEmpty().withMessage('Spécialité requise'),
  body('telephone').trim().notEmpty().withMessage('Téléphone requis'),
  body('idUtilisateur').isUUID(4).withMessage('Utilisateur invalide'),
];

export const updateEnseignantValidator = [
  param('id').isUUID(4).withMessage('ID enseignant invalide'),
  body('specialite').optional().trim().notEmpty(),
  body('telephone').optional().trim().notEmpty(),
  body('idUtilisateur').optional().isUUID(4),
];

export const idEnseignantValidator = [
  param('id').isUUID(4).withMessage('ID enseignant invalide'),
];
