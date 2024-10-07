const exprees=require('express')
const router=exprees.Router()
const usuario=require('../controllers/authController')

// registrar nuevo usuario
router.post('/',usuario.registrarUsuario)
module.exports=router