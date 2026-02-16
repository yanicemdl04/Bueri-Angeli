import { coursService } from '../services/coursService.js';

export const coursController = {
  async create(req, res, next) {
    try {
      const cours = await coursService.create(req.body);
      res.status(201).json(cours);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const cours = await coursService.getById(req.params.id);
      res.json(cours);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const list = await coursService.list();
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const cours = await coursService.update(req.params.id, req.body);
      res.json(cours);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await coursService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
