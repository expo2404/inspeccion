const Vivienda = require('../models/viviendas');

// Obtener todas las viviendas
exports.getAllViviendas = async (req, res) => {
    try {
        const viviendas = await Vivienda.findAll();
        res.status(200).json(viviendas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener viviendas' });
    }
};

// Crear una nueva vivienda
exports.createVivienda = async (req, res) => {
    try {
        const nuevaVivienda = await Vivienda.create(req.body);
        res.status(201).json(nuevaVivienda);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la vivienda' });
    }
};

