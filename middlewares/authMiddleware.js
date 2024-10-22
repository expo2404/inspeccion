const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar variables de entorno desde .env

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').substring(7);
  

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Guardar el usuario decodificado en req.user
    next();  // Pasar al siguiente middleware o ruta
  } catch (error) {
    res.status(400).json({ message: 'Token no válido.' });
  }
};

module.exports = authMiddleware;
