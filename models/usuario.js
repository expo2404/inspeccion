const {Sequelize}=require('sequelize');
const sequelize=require('../config/database');
const Rol = require('./rol');

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
    contraseña:{
        type:Sequelize.STRING,
        allowNull:false
    },
    nombres:{
        type:Sequelize.STRING,
        allowNull:false
    },
    apellidos:{
        type:Sequelize.STRING,
        allowNull:false
    },
    fecha_creacion:{
        type:Sequelize.DATE,
        allowNull:false
    }

},{
    tableName:'usuarios',
    timestamps:false
});

// Relación de muchos a muchos entre 'Usuario' y 'Rol'
Usuario.belongsToMany(Rol, { through: 'UsuarioRoles', foreignKey: 'id_usuario', timestamps: false, as: 'roles'  });
Rol.belongsToMany(Usuario, { through: 'UsuarioRoles', foreignKey: 'id_rol', timestamps: false, as: 'usuarios' });

module.exports=Usuario