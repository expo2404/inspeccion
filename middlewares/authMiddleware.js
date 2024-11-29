const jwt = require('jsonwebtoken');
require('dotenv').config();  // Cargar variables de entorno desde .env

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Obtener el encabezado Authorization
  
  // Verificar si no hay token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No se encontró el token.' });
  }

  const token = authHeader.substring(7); // Extraer el token eliminando "Bearer "
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
