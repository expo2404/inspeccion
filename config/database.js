require('dotenv').config(); // Cargar las variables de entorno del archivo .env

const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario de la base de datos
    process.env.DB_PASSWORD,   // Contraseña de la base de datos
   
    {
        host: process.env.DB_HOST,   // Host (por ejemplo, localhost)
        dialect: process.env.DB_DIALECT, // Dialecto (en este caso, MySQL)
        port: process.env.DB_PORT || 3306, // Puerto de la base de datos (3306 por defecto)
        logging: false // Desactivar logging (opcional)
    }
    
);

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida exitosamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;
