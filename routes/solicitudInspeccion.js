const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const solicitudInspeccion = require('../controllers/solicitudInspeccionController');

// Obtener todas las personas
router.get('/',authMiddleware, solicitudInspeccion.solicitudesInspeccion);

// Crear una nueva persona
// router.post('/',authMiddleware, solicitudInspeccion.crearSolicitudInspeccion);
router.post('/', solicitudInspeccion.crearSolicitudInspeccion);

// eliminar una solicitud
router.delete('/',authMiddleware,solicitudInspeccion.EliminarSolicitud)

// actualizar una inspeccion
router.put('/',authMiddleware,solicitudInspeccion.actualizarInspeccion)
module.exports = router;