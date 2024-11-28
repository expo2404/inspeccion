const express = require('express');
const router = express.Router();
const inspectorController = require('../controllers/inspectorController.js');

// Verficar si hay usuarios
router.get('/', inspectorController.obtenerInspectores);

// Verficar acceso de Inspector
router.get('/solicitud/:id_solicitud/verificar-acceso/:id_inspector', inspectorController.verificarAccesoInspector);

router.put('/', inspectorController.asignarInspector);
module.exports = router;
