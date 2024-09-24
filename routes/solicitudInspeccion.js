const express = require('express');
const router = express.Router();
const solicitudInspeccion = require('../controllers/solicitudInspeccionController');

// Obtener todas las personas
router.get('/', solicitudInspeccion.solicitudesInspeccion);

// Crear una nueva persona
router.post('/', solicitudInspeccion.crearSolicitudInspeccion);

module.exports = router;