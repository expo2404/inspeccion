const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); // tu modelo de usuarios
const moment=require('moment')

// login usuaario
const loginUsuario = async (req, res) => {
    const {email, contraseña} = req.body;

    try {
        // Verificar si el usuario esta logeado
        let user = await Usuario.findOne({ where: { email } });
        

        if (user!=null ) {
            
           
            const password=user.dataValues.contraseña
            const validarPassword=bcrypt.compare(contraseña,password)
            if (validarPassword) {
                  return res.status(200).json({ msg: 'inicio de sesion exitoso' });
            }
          
        }else{
          return   res.status(400).json({msg:'Nombre de Usuario o Contraseña incorrectos.'})
        }

       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = { loginUsuario };