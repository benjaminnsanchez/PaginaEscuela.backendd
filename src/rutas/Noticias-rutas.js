const { Router } = require('express')
const router = Router()
const { crearNoticia, obtenerNoticias } = require('../controladores/noticias-c')
router.post('/noticias/agregar', crearNoticia)
router.get('/noticias/obtenerTodas', obtenerNoticias)
module.exports = router
