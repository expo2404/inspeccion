const exprees=require('express')
const router=exprees.Router()
const usuario=require('../controllers/loginController')

// registrar nuevo usuario
router.post('/',usuario.loginUsuario)
module.exports=router