import { validationResult } from 'express-validator';

/**
 * Middleware qui renvoie 400 avec les erreurs de validation si présentes.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
