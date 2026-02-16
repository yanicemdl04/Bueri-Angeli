import { body, param } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('motDePasse').notEmpty().withMessage('Mot de passe requis'),
];

/** Inscription publique : pas de champ role, réservé à l’Admin pour créer Enseignant/Admin */
export const registerValidator = [
  body('nom').trim().notEmpty().withMessage('Nom requis'),
  body('postnom').trim().notEmpty().withMessage('Postnom requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('motDePasse').isLength({ min: 6 }).withMessage('Mot de passe minimum 6 caractères'),
];

export const createUtilisateurValidator = [
  body('nom').trim().notEmpty().withMessage('Nom requis'),
  body('postnom').trim().notEmpty().withMessage('Postnom requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('motDePasse').isLength({ min: 6 }).withMessage('Mot de passe minimum 6 caractères'),
  body('role').isIn(['Admin', 'Enseignant', 'Parent']).withMessage('Rôle invalide'),
];

export const updateUtilisateurValidator = [
  param('id').isUUID(4).withMessage('ID invalide'),
  body('nom').optional().trim().notEmpty(),
  body('postnom').optional().trim().notEmpty(),
  body('email').optional().isEmail().normalizeEmail(),
  body('motDePasse').optional().isLength({ min: 6 }),
  body('role').optional().isIn(['Admin', 'Enseignant', 'Parent']),
];

export const idUtilisateurValidator = [
  param('id').isUUID(4).withMessage('ID utilisateur invalide'),
];
