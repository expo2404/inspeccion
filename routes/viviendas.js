const express = require('express');
const router = express.Router();
const viviendaController = require('../controllers/viviendaController');

// Obtener todas las viviendas
router.get('/', viviendaController.getAllViviendas);

// Crear una nueva vivienda
router.post('/', viviendaController.createVivienda);

module.exports = router;
