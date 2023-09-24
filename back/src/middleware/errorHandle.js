
function errorHandler(err, req, res, next) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'El token ha expirado' });
    }
    
    if (typeof err === 'string') {
    return res.status(400).json({ message: err });
  }

  return res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = errorHandler
