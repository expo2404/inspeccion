// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/mensaje', chatController.enviarMensaje); // Enviar mensaje
router.get('/mensaje/:chatId', chatController.obtenerMensaje); // Obtener mensajes

module.exports = router;
