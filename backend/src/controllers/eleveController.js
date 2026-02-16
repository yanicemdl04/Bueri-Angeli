import { eleveService } from '../services/eleveService.js';
import { evaluationService } from '../services/evaluationService.js';

export const eleveController = {
  async create(req, res, next) {
    try {
      const eleve = await eleveService.create(req.body);
      res.status(201).json(eleve);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const includeNotes = req.query.includeNotes === 'true';
      const eleve = await eleveService.getById(id, { includeNotes });
      res.json(eleve);
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      const filters = {
        idClasse: req.query.idClasse || undefined,
        search: req.query.search,
        risquesDecrochageMin: req.query.risquesDecrochageMin
          ? parseFloat(req.query.risquesDecrochageMin)
          : undefined,
      };
      const list = await eleveService.list(filters);
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const eleve = await eleveService.update(req.params.id, req.body);
      res.json(eleve);
    } catch (err) {
      next(err);
    }
  },

  async updateRisquesDecrochage(req, res, next) {
    try {
      const score = parseFloat(req.body.risquesDecrochage);
      const eleve = await eleveService.updateRisquesDecrochage(req.params.id, score);
      res.json(eleve);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const result = await eleveService.delete(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getMoyenne(req, res, next) {
    try {
      const idEleve = req.params.id;
      const idCours = req.query.idCours || null;
      const moyenne = await evaluationService.getMoyenneEleve(idEleve, idCours);
      res.json({ idEleve, idCours, moyenne });
    } catch (err) {
      next(err);
    }
  },
};
