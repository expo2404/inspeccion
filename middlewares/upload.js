const multer = require('multer');
const path = require('path');
const moment=require('moment')

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './archivosSubidos');  // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null,moment.locale('es').format('LLL') + path.extname(file.originalname));  // Nombre del archivo con timestamp
    }
});

const upload = multer({ storage });

module.exports = upload;
