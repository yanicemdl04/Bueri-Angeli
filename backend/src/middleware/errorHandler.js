/**
 * Gestionnaire d'erreurs global. À placer en dernier middleware.
 */
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    return res.status(status).json({
      message,
      stack: err.stack,
      ...(err.errors && { errors: err.errors }),
    });
  }

  res.status(status).json({
    message: status === 500 ? 'Erreur interne du serveur' : message,
    ...(err.errors && { errors: err.errors }),
  });
};

/**
 * 404 - Route non trouvée
 */
export const notFound = (req, res) => {
  res.status(404).json({ message: 'Route non trouvée', path: req.originalUrl });
};
