const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const solicitudInspeccion = require('../controllers/solicitudInspeccionController');

// Obtener todas las solicitudes
router.get('/',authMiddleware, solicitudInspeccion.solicitudesInspeccion);

// Crear una nueva solicitud
router.post('/', solicitudInspeccion.crearSolicitudInspeccion);

// eliminar una solicitud
router.delete('/',authMiddleware,solicitudInspeccion.EliminarSolicitud)

// actualizar una solicitud de inspeccion
router.put('/',authMiddleware,solicitudInspeccion.actualizarInspeccion)
module.exports = router;