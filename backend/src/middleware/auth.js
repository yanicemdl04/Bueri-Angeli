import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import prisma from '../config/database.js';

/**
 * Vérifie le JWT et attache l'utilisateur à req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant ou invalide' });
    }
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, config.jwt.secret);

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { idUtilisateur: decoded.idUtilisateur },
      select: {
        idUtilisateur: true,
        nom: true,
        postnom: true,
        email: true,
        role: true,
        dernierLogin: true,
        enseignant: { select: { idEnseignant: true, telephone: true, specialite: true } },
      },
    });

    if (!utilisateur) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }

    req.user = utilisateur;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
    next(err);
  }
};

/**
 * Optionnel : si token présent, attache user ; sinon continue sans user
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return next();
    }
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, config.jwt.secret);
    const utilisateur = await prisma.utilisateur.findUnique({
      where: { idUtilisateur: decoded.idUtilisateur },
      select: { idUtilisateur: true, nom: true, postnom: true, email: true, role: true },
    });
    if (utilisateur) req.user = utilisateur;
    next();
  } catch {
    next();
  }
};
