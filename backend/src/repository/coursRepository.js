import prisma from '../config/database.js';

export const coursRepository = {
  create(data) {
    return prisma.cours.create({ data });
  },

  findById(id, includeEvaluations = false) {
    return prisma.cours.findUnique({
      where: { idCours: id },
      include: includeEvaluations ? { evaluations: true } : undefined,
    });
  },

  findAll() {
    return prisma.cours.findMany({
      orderBy: { nomCours: 'asc' },
    });
  },

  update(id, data) {
    return prisma.cours.update({
      where: { idCours: id },
      data,
    });
  },

  delete(id) {
    return prisma.cours.delete({
      where: { idCours: id },
    });
  },
};
