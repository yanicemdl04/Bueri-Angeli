import prisma from '../config/database.js';

export const evaluationRepository = {
  create(data) {
    return prisma.evaluation.create({ data });
  },

  findById(id) {
    return prisma.evaluation.findUnique({
      where: { idNote: id },
      include: { eleve: true, cours: true },
    });
  },

  findByEleve(idEleve, filters = {}) {
    const where = { idEleve };
    if (filters.idCours) where.idCours = filters.idCours;
    if (filters.type) where.type = filters.type;
    return prisma.evaluation.findMany({
      where,
      include: { cours: true },
      orderBy: { date: 'desc' },
    });
  },

  findByClasse(idClasse, filters = {}) {
    return prisma.evaluation.findMany({
      where: {
        eleve: { idClasse },
        ...(filters.idCours && { idCours: filters.idCours }),
        ...(filters.type && { type: filters.type }),
      },
      include: { eleve: true, cours: true },
      orderBy: [{ date: 'desc' }, { eleve: { nom: 'asc' } }],
    });
  },

  findAll(filters = {}) {
    const where = {};
    if (filters.idEleve) where.idEleve = filters.idEleve;
    if (filters.idCours) where.idCours = filters.idCours;
    if (filters.type) where.type = filters.type;
    return prisma.evaluation.findMany({
      where,
      include: { eleve: true, cours: true },
      orderBy: { date: 'desc' },
    });
  },

  update(id, data) {
    return prisma.evaluation.update({
      where: { idNote: id },
      data,
    });
  },

  delete(id) {
    return prisma.evaluation.delete({
      where: { idNote: id },
    });
  },
};
