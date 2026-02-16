import { authService } from '../services/authService.js';

export const authController = {
  async login(req, res, next) {
    try {
      const { email, motDePasse } = req.body;
      const result = await authService.login(email, motDePasse);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },

  async me(req, res) {
    res.json(req.user);
  },
};
