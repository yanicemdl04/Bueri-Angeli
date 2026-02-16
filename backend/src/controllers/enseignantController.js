import { enseignantService } from '../services/enseignantService.js';

export const enseignantController = {
  async create(req, res, next) {
    try {
      const enseignant = await enseignantService.create(req.body);
      res.status(201).json(enseignant);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const enseignant = await enseignantService.getById(req.params.id);
      res.json(enseignant);
    } catch (err) {
      next(err);
    }
  },

  async getByMe(req, res, next) {
    try {
      if (!req.user?.enseignant?.idEnseignant) {
        return res.status(403).json({ message: 'Compte non enseignant' });
      }
      const enseignant = await enseignantService.getByUserId(req.user.idUtilisateur);
      res.json(enseignant);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const list = await enseignantService.list();
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const enseignant = await enseignantService.update(req.params.id, req.body);
      res.json(enseignant);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await enseignantService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
