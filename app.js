const express = require('express');
const cors = require('cors');
const app = express();
const solicitudesRoutes=require('./routes/solicitudInspeccion')
const personasRoutes = require('./routes/personas');
const viviendasRoutes = require('./routes/viviendas');
const authRoutes=require('./routes/auth')
const loginRoutes=require('./routes/login')
const usuariosRoutes=require('./routes/usuarios.js')
const sequelize = require('./config/database');

// Middleware
app.use(cors());
app.use(express.json());


// Rutas
app.use('/api/solicitudInspeccion', solicitudesRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/viviendas', viviendasRoutes);
app.use('/api/registrarse',authRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conectar a la base de datos y sincronizar modelos
sequelize.sync()
    .then(() => console.log('Conexión con la base de datos exitosa'))
    .catch(err => console.log('Error al conectar con la base de datos: ' + err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
