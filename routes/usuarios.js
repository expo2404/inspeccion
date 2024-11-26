const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

// Verficar si hay usuarios
router.get('/', usuarioController.verficaUsuarios);

module.exports = router;
