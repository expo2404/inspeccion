const Persona = require('../models/personas');

// Obtener todas las personas
exports.getAllPersonas = async (req, res) => {
    try {
        const personas = await Persona.findAll();
        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener personas' });
    }
};

// Crear una nueva persona
exports.createPersona = async (req, res) => {
    try {
        const nuevaPersona = await Persona.create(req.body);
        res.status(201).json(nuevaPersona);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la persona' });
    }
};