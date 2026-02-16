import prisma from '../config/database.js';

export const utilisateurRepository = {
  create(data) {
    return prisma.utilisateur.create({ data });
  },

  findByEmail(email) {
    return prisma.utilisateur.findUnique({
      where: { email },
      include: { enseignant: true },
    });
  },

  findById(id) {
    return prisma.utilisateur.findUnique({
      where: { idUtilisateur: id },
      include: { enseignant: true, notifications: true },
    });
  },

  findAll(filters = {}) {
    return prisma.utilisateur.findMany({
      where: filters.role ? { role: filters.role } : {},
      include: { enseignant: true },
      orderBy: { nom: 'asc' },
    });
  },

  update(id, data) {
    return prisma.utilisateur.update({
      where: { idUtilisateur: id },
      data,
    });
  },

  updateDernierLogin(id) {
    return prisma.utilisateur.update({
      where: { idUtilisateur: id },
      data: { dernierLogin: new Date() },
    });
  },

  delete(id) {
    return prisma.utilisateur.delete({
      where: { idUtilisateur: id },
    });
  },
};
