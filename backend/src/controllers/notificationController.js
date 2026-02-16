import { notificationService } from '../services/notificationService.js';

export const notificationController = {
  async create(req, res, next) {
    try {
      const notif = await notificationService.create(req.body);
      res.status(201).json(notif);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const notif = await notificationService.getById(req.params.id);
      res.json(notif);
    } catch (err) {
      next(err);
    }
  },

  async listMine(req, res, next) {
    try {
      const nonLuesOnly = req.query.nonLuesOnly === 'true';
      const list = await notificationService.listByUser(req.user.idUtilisateur, nonLuesOnly);
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async markAsRead(req, res, next) {
    try {
      const notif = await notificationService.markAsRead(req.params.id);
      res.json(notif);
    } catch (err) {
      next(err);
    }
  },

  async markAllAsRead(req, res, next) {
    try {
      const result = await notificationService.markAllAsRead(req.user.idUtilisateur);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await notificationService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
