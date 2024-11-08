const express = require('express')
const router = express.Router()
const dptoController = require('../controllers/dptoController.js')

// Genera nuevo pdf
router.get('/', dptoController.obtenerDptos)
module.exports=router