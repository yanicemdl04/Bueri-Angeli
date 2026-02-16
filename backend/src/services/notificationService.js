import { notificationRepository } from '../repository/notificationRepository.js';

export const notificationService = {
  async create(data) {
    return notificationRepository.create(data);
  },

  async getById(id) {
    const notif = await notificationRepository.findById(id);
    if (!notif) {
      const err = new Error('Notification non trouvée');
      err.statusCode = 404;
      throw err;
    }
    return notif;
  },

  async listByUser(idUtilisateur, nonLuesOnly = false) {
    return notificationRepository.findByUtilisateur(idUtilisateur, nonLuesOnly);
  },

  async markAsRead(id) {
    await this.getById(id);
    return notificationRepository.markAsRead(id);
  },

  async markAllAsRead(idUtilisateur) {
    await notificationRepository.markAllAsRead(idUtilisateur);
    return { message: 'Toutes les notifications marquées comme lues' };
  },

  async delete(id) {
    await this.getById(id);
    await notificationRepository.delete(id);
    return { message: 'Notification supprimée' };
  },
};
