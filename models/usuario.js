const {Sequelize}=require('sequelize');
const sequelize=require('../config/database');

const Usuario=sequelize.define('Usuario',{
    id_usuario:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre_usuario:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    contrasenia:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rol:{
        type:Sequelize.STRING,
        allowNull:false
    }

},{
    tableName:'usuarios',
    timestamps:false
});

module.exports=Usuario