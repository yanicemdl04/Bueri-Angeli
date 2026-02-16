import { classeScolaireService } from '../services/classeScolaireService.js';

export const classeScolaireController = {
  async create(req, res, next) {
    try {
      const classe = await classeScolaireService.create(req.body);
      res.status(201).json(classe);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const includeEleves = req.query.includeEleves === 'true';
      const includeEnseignants = req.query.includeEnseignants === 'true';
      const classe = await classeScolaireService.getById(id, {
        includeEleves,
        includeEnseignants,
      });
      res.json(classe);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const filters = {
        niveau: req.query.niveau,
        anneeScolaire: req.query.anneeScolaire,
      };
      const list = await classeScolaireService.list(filters);
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const classe = await classeScolaireService.update(req.params.id, req.body);
      res.json(classe);
    } catch (err) {
      next(err);
    }
  },

  async setEnseignants(req, res, next) {
    try {
      const classe = await classeScolaireService.setEnseignants(
        req.params.id,
        req.body.idEnseignants
      );
      res.json(classe);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await classeScolaireService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
