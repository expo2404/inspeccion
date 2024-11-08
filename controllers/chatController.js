// controllers/chatController.js
const db = require('../config/firebase');
const moment=require('moment')

// Enviar mensaje
const enviarMensaje = async (req, res) => {
  const { chatId, mensaje, usuario } = req.body;
  const timestamp = moment().locale('es').format('LLL');

  try {
    const nuevoMensajeRef = db.ref(`/chat/${chatId}`).push();
    await nuevoMensajeRef.set({ mensaje, usuario, timestamp });
    res.status(201).json({ mensaje: 'Mensaje enviado', id: nuevoMensajeRef.key });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje', details: error.mensaje });
  }
};

// Obtener mensajes
const obtenerMensaje = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messagesRef = db.ref(`/chat/${chatId}`);
    console.log(messagesRef)
    messagesRef.once('value', (snapshot) => {
      const messages = snapshot.val();
      console.log(messages)
      res.status(200).json(messages ? Object.values(messages) : []);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes', details: error.message });
  }
};
module.exports={
enviarMensaje,
obtenerMensaje
}