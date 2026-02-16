import prisma from '../config/database.js';

export const notificationRepository = {
  create(data) {
    return prisma.notification.create({ data });
  },

  findById(id) {
    return prisma.notification.findUnique({
      where: { idNotification: id },
      include: { utilisateur: true },
    });
  },

  findByUtilisateur(idUtilisateur, nonLuesOnly = false) {
    const where = { idUtilisateur };
    if (nonLuesOnly) where.lue = false;
    return prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  markAsRead(id) {
    return prisma.notification.update({
      where: { idNotification: id },
      data: { lue: true },
    });
  },

  markAllAsRead(idUtilisateur) {
    return prisma.notification.updateMany({
      where: { idUtilisateur },
      data: { lue: true },
    });
  },

  delete(id) {
    return prisma.notification.delete({
      where: { idNotification: id },
    });
  },
};
