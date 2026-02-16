/**
 * RBAC - Seuls les rôles autorisés peuvent accéder.
 * Usage: requireRole('Admin'), requireRole('Admin', 'Enseignant')
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Accès refusé. Rôle insuffisant.',
        required: allowedRoles,
      });
    }
    next();
  };
};

export const adminOnly = requireRole('Admin');
export const enseignantOrAdmin = requireRole('Admin', 'Enseignant');
