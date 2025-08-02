const { Router } = require('express')
const router = Router()
const { crearNoticia } = require('../controladores/noticias-c')
router.post('/notas/agregar', crearNoticia)

module.exports = router
