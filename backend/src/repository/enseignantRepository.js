import prisma from '../config/database.js';

export const enseignantRepository = {
  create(data) {
    return prisma.enseignant.create({ data });
  },

  findById(id, includeUser = false, includeClasses = false) {
    return prisma.enseignant.findUnique({
      where: { idEnseignant: id },
      include: {
        ...(includeUser && { utilisateur: true }),
        ...(includeClasses && { classes: { include: { classe: true } } }),
      },
    });
  },

  findByUserId(idUtilisateur) {
    return prisma.enseignant.findUnique({
      where: { idUtilisateur },
      include: { utilisateur: true, classes: { include: { classe: true } } },
    });
  },

  findAll(filters = {}) {
    return prisma.enseignant.findMany({
      include: {
        utilisateur: { select: { nom: true, postnom: true, email: true, role: true } },
        classes: { include: { classe: true } },
      },
      orderBy: { utilisateur: { nom: 'asc' } },
    });
  },

  update(id, data) {
    return prisma.enseignant.update({
      where: { idEnseignant: id },
      data,
    });
  },

  delete(id) {
    return prisma.enseignant.delete({
      where: { idEnseignant: id },
    });
  },

  addClasse(idEnseignant, idClasse) {
    return prisma.enseignantClasse.create({
      data: { idEnseignant, idClasse },
    });
  },

  removeClasse(idEnseignant, idClasse) {
    return prisma.enseignantClasse.delete({
      where: { idEnseignant_idClasse: { idEnseignant, idClasse } },
    });
  },
};
