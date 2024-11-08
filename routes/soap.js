const express = require('express')
const router = express.Router()
const soapController = require('../controllers/soapController.js');

router.get('/', soapController.getExpedientes);
router.post('/', soapController.getVivienda);

module.exports = router;
