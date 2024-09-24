const {Sequelize}=require('sequelize')
const sequelize=require('../config/database')
const Personas=require('./personas')


const Viviendas=sequelize.define('Viviendas',{
    id_vivienda:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },barrio:{
        type:Sequelize.STRING,
        allowNull:true,

    },sector:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },manzana:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },lote:{
        type:Sequelize.STRING,
        allowNull:true,
        
    },id_persona:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:Personas,
            key:'id_persona'
        }
    }
    
},{
    tableName:'viviendas',
    timestamps: false
});
Personas.hasOne(Viviendas, { foreignKey: 'id_persona' }); // hasOne es una relacion de uno a uno del model
Viviendas.belongsTo(Personas, { foreignKey: 'id_persona' });
module.exports=Viviendas