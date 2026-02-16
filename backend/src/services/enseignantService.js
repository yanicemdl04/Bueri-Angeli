import prisma from '../config/database.js';
import { enseignantRepository } from '../repository/enseignantRepository.js';

export const enseignantService = {
  async create(data) {
    const user = await prisma.utilisateur.findUnique({
      where: { idUtilisateur: data.idUtilisateur },
    });
    if (!user) {
      const err = new Error('Utilisateur non trouvé');
      err.statusCode = 404;
      throw err;
    }
    const existing = await enseignantRepository.findByUserId(data.idUtilisateur);
    if (existing) {
      const err = new Error('Cet utilisateur est déjà lié à un enseignant');
      err.statusCode = 409;
      throw err;
    }
    return enseignantRepository.create(data);
  },

  async getById(id, options = {}) {
    const enseignant = await enseignantRepository.findById(
      id,
      options.includeUser ?? true,
      options.includeClasses ?? true
    );
    if (!enseignant) {
      const err = new Error('Enseignant non trouvé');
      err.statusCode = 404;
      throw err;
    }
    return enseignant;
  },

  async getByUserId(idUtilisateur) {
    const enseignant = await enseignantRepository.findByUserId(idUtilisateur);
    if (!enseignant) {
      const err = new Error('Enseignant non trouvé');
      err.statusCode = 404;
      throw err;
    }
    return enseignant;
  },

  async list() {
    return enseignantRepository.findAll();
  },

  async update(id, data) {
    await this.getById(id);
    if (data.idUtilisateur) {
      const user = await prisma.utilisateur.findUnique({
        where: { idUtilisateur: data.idUtilisateur },
      });
      if (!user) {
        const err = new Error('Utilisateur non trouvé');
        err.statusCode = 404;
        throw err;
      }
    }
    return enseignantRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    await enseignantRepository.delete(id);
    return { message: 'Enseignant supprimé' };
  },
};
