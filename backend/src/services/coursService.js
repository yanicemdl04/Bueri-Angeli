import { coursRepository } from '../repository/coursRepository.js';

export const coursService = {
  async create(data) {
    return coursRepository.create(data);
  },

  async getById(id, options = {}) {
    const cours = await coursRepository.findById(id, options.includeEvaluations ?? false);
    if (!cours) {
      const err = new Error('Cours non trouvé');
      err.statusCode = 404;
      throw err;
    }
    return cours;
  },

  async list() {
    return coursRepository.findAll();
  },

  async update(id, data) {
    await this.getById(id);
    return coursRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    await coursRepository.delete(id);
    return { message: 'Cours supprimé' };
  },
};
