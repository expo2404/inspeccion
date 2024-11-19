const exprees=require('express')
const router=exprees.Router()
const filtroBusquedaForm=require('../controllers/filtroBusquedaController')
const authMiddleware = require('../middlewares/authMiddleware')
router.post('/',authMiddleware,filtroBusquedaForm.filtroBusquedaForm)

module.exports=router