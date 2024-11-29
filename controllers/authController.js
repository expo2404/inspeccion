const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); // Modelo de usuarios
const Rol = require('../models/rol'); // Modelo de roles
const moment = require('moment');

// Registro de nuevo usuario
const registrarUsuario = async (req, res) => {
    console.log(req.body);
    const { nombres, apellidos, email, contraseña, nombre_usuario, roles } = req.body; // Ahora roles es un arreglo

    try {
        // Verificar si el usuario ya existe
        let usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);
        const fechaActual = moment().locale('en-ca').format('YYYY-MM-DD');

        // Crear el usuario en la base de datos
        const usuario = await Usuario.create({
            nombres,
            apellidos,
            email,
            contraseña: hashedPassword,
            nombre_usuario,
            fecha_creacion: fechaActual,
        });

        // Validar y asociar roles
        if (roles && Array.isArray(roles)) {
            const rolesValidos = await Rol.findAll({
                where: { nombre: roles }, // Buscar roles válidos en la base de datos
            });

            if (rolesValidos.length !== roles.length) {
                return res.status(400).json({ msg: 'Uno o más roles no son válidos' });
            }

            // Asociar los roles al usuario
            await usuario.addRoles(rolesValidos);
        }

        res.json({ msg: 'Usuario registrado exitosamente', usuario });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = { registrarUsuario };
