import { evaluationService } from '../services/evaluationService.js';

export const evaluationController = {
  async create(req, res, next) {
    try {
      const note = await evaluationService.create(req.body);
      res.status(201).json(note);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const note = await evaluationService.getById(req.params.id);
      res.json(note);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const filters = {
        idEleve: req.query.idEleve || undefined,
        idCours: req.query.idCours || undefined,
        idClasse: req.query.idClasse || undefined,
        type: req.query.type,
      };
      const list = await evaluationService.list(filters);
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const note = await evaluationService.update(req.params.id, req.body);
      res.json(note);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await evaluationService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
