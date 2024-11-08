const express = require('express');
const cors = require('cors');
const app = express();
const solicitudesRoutes=require('./routes/solicitudInspeccion')
const personasRoutes = require('./routes/personas');
const viviendasRoutes = require('./routes/viviendas');
const authRoutes=require('./routes/auth')
const loginRoutes=require('./routes/login')
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

// Conectar a la base de datos y sincronizar modelos
sequelize.sync()
    .then(() => console.log('Conexión con la base de datos exitosa'))
    .catch(err => console.log('Error al conectar con la base de datos: ' + err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

const soap = require('soap');

const Vivienda = require('./models/viviendas');
const { Console } = require('console');

// Define el servicio y el método ObtenerVivienda
const servicioVivienda = {
    ViviendaService: {
        ViviendaPort: {
            ObtenerVivienda: async function(args) {
                const viviendaId = args.id;
                console.log(viviendaId);
                try {
                    const vivienda = await Vivienda.findByPk(viviendaId);
                    if (vivienda) {
                        return {
                            id: vivienda.id,
                            barrio: vivienda.barrio,
                            manzana: vivienda.manzana,
                            lote: vivienda.lote,
                            numero_expediente:vivienda.numero_expediente
                        };
                    } else {
                        return { mensaje: "Vivienda no encontrada" };
                    }
                } catch (error) {
                    console.error(error);
                    return { mensaje: "Error en la consulta" };
                }
            }
        }
    }
};

// WSDL
const xml = require('fs').readFileSync('./service/viviendaService.wsdl', 'utf8');

app.listen(8001, function () {
    soap.listen(app, '/viviendaService', servicioVivienda, xml, function() {
        console.log('Servicio SOAP en funcionamiento en http://localhost:8001/viviendaService?wsdl');
    });
});