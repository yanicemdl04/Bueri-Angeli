import prisma from '../config/database.js';
import { evaluationRepository } from '../repository/evaluationRepository.js';

export const evaluationService = {
  async create(data) {
    const [eleve, cours] = await Promise.all([
      prisma.eleve.findUnique({ where: { idEleve: data.idEleve } }),
      prisma.cours.findUnique({ where: { idCours: data.idCours } }),
    ]);
    if (!eleve) {
      const err = new Error('Élève non trouvé');
      err.statusCode = 404;
      throw err;
    }
    if (!cours) {
      const err = new Error('Cours non trouvé');
      err.statusCode = 404;
      throw err;
    }
    return evaluationRepository.create(data);
  },

  async getById(id) {
    const note = await evaluationRepository.findById(id);
    if (!note) {
      const err = new Error('Note non trouvée');
      err.statusCode = 404;
      throw err;
    }
    return note;
  },

  async list(filters = {}) {
    if (filters.idClasse) {
      return evaluationRepository.findByClasse(filters.idClasse, filters);
    }
    if (filters.idEleve) {
      return evaluationRepository.findByEleve(filters.idEleve, filters);
    }
    return evaluationRepository.findAll(filters);
  },

  async update(id, data) {
    await this.getById(id);
    if (data.idEleve) {
      const eleve = await prisma.eleve.findUnique({
        where: { idEleve: data.idEleve },
      });
      if (!eleve) {
        const err = new Error('Élève non trouvé');
        err.statusCode = 404;
        throw err;
      }
    }
    if (data.idCours) {
      const cours = await prisma.cours.findUnique({
        where: { idCours: data.idCours },
      });
      if (!cours) {
        const err = new Error('Cours non trouvé');
        err.statusCode = 404;
        throw err;
      }
    }
    return evaluationRepository.update(id, data);
  },

  async delete(id) {
    await this.getById(id);
    await evaluationRepository.delete(id);
    return { message: 'Note supprimée' };
  },

  /**
   * Moyenne pondérée d'un élève (tous cours ou par cours).
   * Somme(valeur * ponderation) / Somme(ponderation) par cours puis moyenne des cours.
   */
  async getMoyenneEleve(idEleve, idCours = null) {
    const notes = await evaluationRepository.findByEleve(idEleve, idCours ? { idCours } : {});
    const coursIds = [...new Set(notes.map((n) => n.idCours))];
    const cours = await prisma.cours.findMany({
      where: { idCours: { in: coursIds } },
    });
    const ponderationByCours = Object.fromEntries(cours.map((c) => [c.idCours, c.ponderation]));

    const byCours = {};
    for (const n of notes) {
      if (!byCours[n.idCours]) byCours[n.idCours] = { sum: 0, pond: 0 };
      const p = ponderationByCours[n.idCours] || 1;
      byCours[n.idCours].sum += n.valeur * p;
      byCours[n.idCours].pond += p;
    }
    const moyennesCours = Object.values(byCours)
      .filter((x) => x.pond > 0)
      .map((x) => x.sum / x.pond);
    if (moyennesCours.length === 0) return null;
    const moyenne =
      moyennesCours.reduce((a, b) => a + b, 0) / moyennesCours.length;
    return Math.round(moyenne * 100) / 100;
  },
};
