const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Obtener todas las personas
router.get('/', personaController.getAllPersonas);

// Crear una nueva persona
router.post('/', personaController.createPersona);

module.exports = router;
