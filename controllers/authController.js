const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); // tu modelo de usuarios
const moment=require('moment')

// Registro de nuevo usuario
const registrarUsuario = async (req, res) => {
    const {nombres,apellidos,email, contraseña,nombre_usuario,rol} = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await Usuario.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);
        const fechaActual=moment().locale('en-ca').format('L');
        

       

        // Crear usuario y guardar en la base de datos
        user = await Usuario.create({
            nombres,
            apellidos,
            email,
            contraseña: hashedPassword,
            nombre_usuario,
            rol,
            fecha_creacion:fechaActual
        });

        res.json({ msg: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = { registrarUsuario };
