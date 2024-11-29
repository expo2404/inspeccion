const {Sequelize}=require('sequelize');
const sequelize=require('../config/database');
const Usuario=require('./usuario');
const Viviendas=require('./viviendas');


const SolicitudInspeccion=sequelize.define('SolicitudInspeccion',{
    id_solicitud:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },fecha_solicitud:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
    },estado: {
        type: Sequelize.STRING,
        allowNull: false
    },id_vivienda:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:Viviendas,
            key:'id_vivienda'
        }
    }, tipo_solicitud: {
        type: Sequelize.STRING,
        allowNull: false
    },id_sector:{
        type:Sequelize.INTEGER,
        references:{
            model:Usuario,
            key:'id_usuario'
        }
    },
    id_inspector: { // Nuevo campo
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    }
}, {
    tableName: 'solicitudes_inspeccion', // Nombre de la tabla en la base de datos
    timestamps: false
});

// Relaciones
Usuario.hasMany(SolicitudInspeccion, { foreignKey: 'id_sector' });
SolicitudInspeccion.belongsTo(Usuario, { foreignKey: 'id_sector' });

Usuario.hasMany(SolicitudInspeccion, { foreignKey: 'id_inspector' }); // Relación nueva
SolicitudInspeccion.belongsTo(Usuario, { foreignKey: 'id_inspector' }); // Relación nueva

Viviendas.hasMany(SolicitudInspeccion, { foreignKey: 'id_vivienda' });
SolicitudInspeccion.belongsTo(Viviendas, { foreignKey: 'id_vivienda' });

module.exports = SolicitudInspeccion;