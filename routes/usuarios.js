const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

// Verficar si hay usuarios
router.get('/', usuarioController.verficaUsuarios);

router.get('/:id_solicitud', usuarioController.obtenerInspectorPorSolicitud);


module.exports = router;
