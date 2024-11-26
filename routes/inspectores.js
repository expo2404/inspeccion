const express = require('express');
const router = express.Router();
const inspectorController = require('../controllers/inspectorController.js');

// Verficar si hay usuarios
router.get('/', inspectorController.obtenerInspectores);


router.put('/', inspectorController.asignarInspector);
module.exports = router;
