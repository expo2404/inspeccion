const express = require('express')
const router = express.Router()
const pdfController = require('../controllers/pdfController.js')

// Genera nuevo pdf
router.get('/:id_solicitud', pdfController.generarPdf)
module.exports=router
