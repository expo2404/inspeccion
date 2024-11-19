const exprees=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const filtroBusquedaController=require('../controllers/filtroBusquedaController')
const router=exprees.Router()
router.post('/',authMiddleware,filtroBusquedaController.filtroBusquedaForm)

module.exports=router