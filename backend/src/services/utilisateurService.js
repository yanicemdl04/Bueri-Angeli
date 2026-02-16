import bcrypt from 'bcryptjs';
import { config } from '../config/index.js';
import { utilisateurRepository } from '../repository/utilisateurRepository.js';

export const utilisateurService = {
  async create(data) {
    const existing = await utilisateurRepository.findByEmail(data.email);
    if (existing) {
      const err = new Error('Un compte existe déjà avec cet email');
      err.statusCode = 409;
      throw err;
    }
    const hashed = await bcrypt.hash(data.motDePasse, config.bcryptRounds);
    const user = await utilisateurRepository.create({
      ...data,
      motDePasse: hashed,
    });
    const { motDePasse: _, ...safe } = user;
    return safe;
  },

  async getById(id) {
    const user = await utilisateurRepository.findById(id);
    if (!user) {
      const err = new Error('Utilisateur non trouvé');
      err.statusCode = 404;
      throw err;
    }
    const { motDePasse: _, ...safe } = user;
    return safe;
  },

  async list(filters) {
    return utilisateurRepository.findAll(filters);
  },

  async update(id, data) {
    await this.getById(id);
    if (data.email) {
      const existing = await utilisateurRepository.findByEmail(data.email);
      if (existing && existing.idUtilisateur !== id) {
        const err = new Error('Cet email est déjà utilisé');
        err.statusCode = 409;
        throw err;
      }
    }
    if (data.motDePasse) {
      data.motDePasse = await bcrypt.hash(data.motDePasse, config.bcryptRounds);
    }
    const user = await utilisateurRepository.update(id, data);
    const { motDePasse: _, ...safe } = user;
    return safe;
  },

  async delete(id) {
    await this.getById(id);
    await utilisateurRepository.delete(id);
    return { message: 'Utilisateur supprimé' };
  },
};
