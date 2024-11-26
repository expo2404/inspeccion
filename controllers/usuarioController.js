const Usuario = require('../models/usuario');

// Obtener todas las personas
exports.verficaUsuarios = async (req, res) => {
    try {
        const count = await Usuario.count();
        res.json({ usersExist: count > 0 });
      } catch (error) {
        res.status(500).json({ error: 'Error al verificar usuarios' });
      }
    
};