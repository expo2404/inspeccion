const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Usuario = require('../models/usuario'); // tu modelo de usuarios


// login usuario
const loginUsuario = async (req, res) => {
    const {email, contraseña} = req.body;
    

    try {
        // Verificar si el usuario esta logeado
        let user = await Usuario.findOne({ where: { email } });
        
        

        if (user!=null ) {
            
           
            const password=user.dataValues.contraseña
            
          
            var resultado=await bcrypt.compare(contraseña,password)
            
            if (resultado) {

                const token = jwt.sign(
                    { id: user.dataValues.id_usuario, email: user.dataValues.email },  // Información contenida en el token
                    process.env.JWT_SECRET,              // Clave secreta para firmar el token
                    { expiresIn: '1h' }                  // Tiempo de expiración del token
                );
        
                // Enviar el token al cliente
                res.json({
                    message: 'Login exitoso',
                    token: token
                });
                  
            }else{
                return   res.status(400).json({msg:'Nombre de Usuario o Contraseña incorrectos.'})
              }
          
        }else{
          return   res.status(400).json({msg:'Nombre de Usuario o Contraseña incorrectos.'})
        }

       
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = { loginUsuario };