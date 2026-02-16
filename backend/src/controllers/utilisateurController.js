import { utilisateurService } from '../services/utilisateurService.js';

export const utilisateurController = {
  async create(req, res, next) {
    try {
      const user = await utilisateurService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const user = await utilisateurService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const list = await utilisateurService.list(req.query);
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const user = await utilisateurService.update(req.params.id, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await utilisateurService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
