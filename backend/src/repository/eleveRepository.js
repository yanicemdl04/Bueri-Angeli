import prisma from '../config/database.js';

export const eleveRepository = {
  create(data) {
    return prisma.eleve.create({ data });
  },

  findById(id, includeClasse = false, includeNotes = false) {
    return prisma.eleve.findUnique({
      where: { idEleve: id },
      include: {
        ...(includeClasse && { classe: true }),
        ...(includeNotes && { notes: { include: { cours: true } } }),
      },
    });
  },

  findAll(filters = {}) {
    const where = {};
    if (filters.idClasse) where.idClasse = filters.idClasse;
    if (filters.risquesDecrochageMin != null)
      where.risquesDecrochage = { gte: filters.risquesDecrochageMin };
    if (filters.search) {
      where.OR = [
        { nom: { contains: filters.search } },
        { prenom: { contains: filters.search } },
      ];
    }
    return prisma.eleve.findMany({
      where,
      include: { classe: true },
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
    });
  },

  update(id, data) {
    return prisma.eleve.update({
      where: { idEleve: id },
      data,
    });
  },

  updateRisquesDecrochage(id, score) {
    return prisma.eleve.update({
      where: { idEleve: id },
      data: { risquesDecrochage: score },
    });
  },

  delete(id) {
    return prisma.eleve.delete({
      where: { idEleve: id },
    });
  },

  countByClasse(idClasse) {
    return prisma.eleve.count({ where: { idClasse } });
  },
};
