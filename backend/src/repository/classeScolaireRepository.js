import prisma from '../config/database.js';

export const classeScolaireRepository = {
  create(data) {
    return prisma.classeScolaire.create({ data });
  },

  findById(id, includeEleves = false, includeEnseignants = false) {
    return prisma.classeScolaire.findUnique({
      where: { idClasse: id },
      include: {
        ...(includeEleves && { eleves: true }),
        ...(includeEnseignants && { enseignants: { include: { enseignant: true } } }),
      },
    });
  },

  findAll(filters = {}) {
    const where = {};
    if (filters.niveau) where.niveau = filters.niveau;
    if (filters.anneeScolaire) where.anneeScolaire = filters.anneeScolaire;
    return prisma.classeScolaire.findMany({
      where,
      include: {
        _count: { select: { eleves: true } },
      },
      orderBy: [{ niveau: 'asc' }, { nomClasse: 'asc' }],
    });
  },

  update(id, data) {
    return prisma.classeScolaire.update({
      where: { idClasse: id },
      data,
    });
  },

  delete(id) {
    return prisma.classeScolaire.delete({
      where: { idClasse: id },
    });
  },

  setEnseignants(idClasse, idEnseignants) {
    return prisma.classeScolaire.update({
      where: { idClasse },
      data: {
        enseignants: {
          deleteMany: {},
          create: idEnseignants.map((idEnseignant) => ({ idEnseignant, idClasse })),
        },
      },
      include: { enseignants: { include: { enseignant: true } } },
    });
  },
};
