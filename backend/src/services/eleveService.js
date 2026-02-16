import { eleveRepository } from '../repository/eleveRepository.js';
import prisma from '../config/database.js';

export const eleveService = {
  async create(data) {
    const classe = await prisma.classeScolaire.findUnique({
      where: { idClasse: data.idClasse },
    });
    if (!classe) {
      const err = new Error('Classe non trouvée');
      err.statusCode = 404;
      throw err;
    }
    return eleveRepository.create(data);
  },

  async getById(id, options) {
    const opts = options || {};
    const eleve = await eleveRepository.findById(
      id,
      opts.includeClasse !== false,
      opts.includeNotes === true
    );
    if (!eleve) {
      const err = new Error('Élève non trouvé');
      err.statusCode = 404;
      throw err;
    }
    return eleve;
  },

  async list(filters) {
    return eleveRepository.findAll(filters || {});
  },

  async update(id, data) {
    await this.getById(id);
    if (data.idClasse) {
      const classe = await prisma.classeScolaire.findUnique({
        where: { idClasse: data.idClasse },
      });
      if (!classe) {
        const err = new Error('Classe non trouvée');
        err.statusCode = 404;
        throw err;
      }
    }
    return eleveRepository.update(id, data);
  },

  async updateRisquesDecrochage(id, score) {
    await this.getById(id);
    return eleveRepository.updateRisquesDecrochage(id, score);
  },

  async delete(id) {
    await this.getById(id);
    await eleveRepository.delete(id);
    return { message: 'Élève supprimé' };
  },
};
