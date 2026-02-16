import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { utilisateurRepository } from '../repository/utilisateurRepository.js';

export const authService = {
  async login(email, motDePasse) {
    const user = await utilisateurRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Email ou mot de passe incorrect');
      err.statusCode = 401;
      throw err;
    }
    const valid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!valid) {
      const err = new Error('Email ou mot de passe incorrect');
      err.statusCode = 401;
      throw err;
    }
    await utilisateurRepository.updateDernierLogin(user.idUtilisateur);
    const token = jwt.sign(
      { idUtilisateur: user.idUtilisateur },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    const { motDePasse: _, ...safeUser } = user;
    return { token, user: safeUser };
  },

  async register(data) {
    const existing = await utilisateurRepository.findByEmail(data.email);
    if (existing) {
      const err = new Error('Un compte existe déjà avec cet email');
      err.statusCode = 409;
      throw err;
    }
    const hashed = await bcrypt.hash(data.motDePasse, config.bcryptRounds);
    const user = await utilisateurRepository.create({
      nom: data.nom,
      postnom: data.postnom,
      email: data.email,
      motDePasse: hashed,
      role: 'Parent',
    });
    const { motDePasse: _, ...safeUser } = user;
    return safeUser;
  },
};
