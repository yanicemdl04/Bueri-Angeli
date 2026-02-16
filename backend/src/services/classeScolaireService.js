import { classeScolaireRepository } from '../repository/classeScolaireRepository.js';

export const classeScolaireService = {
  async create(data) {
    return classeScolaireRepository.create(data);
  },

  async getById(id, options) {
    const opts = options || {};
    const classe = await classeScolaireRepository.findById(
      id,
      opts.includeEleves === true,
      opts.includeEnseignants === true
    );
    if (!classe) {
      const err = new Error('Classe non trouvée');
      err.statusCode = 404;
      throw err;
    }
    return classe;
  },

  async list(filters) {
    return classeScolaireRepository.findAll(filters || {});
  },

  async update(id, data) {
    await this.getById(id);
    return classeScolaireRepository.update(id, data);
  },

  async setEnseignants(idClasse, idEnseignants) {
    await this.getById(idClasse);
    return classeScolaireRepository.setEnseignants(idClasse, idEnseignants);
  },

  async delete(id) {
    await this.getById(id);
    await classeScolaireRepository.delete(id);
    return { message: 'Classe supprimée' };
  },
};
