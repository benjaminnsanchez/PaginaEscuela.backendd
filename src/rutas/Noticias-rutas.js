const { Router } = require('express')
const router = Router()
const { crearNoticia, obtenerNoticias, eliminarNoticia, actualizarNoticia, borrarNoticiasPorEspacio } = require('../controladores/noticias-c')
router.post('/noticias/agregar', crearNoticia)
router.get('/noticias/obtenerTodas', obtenerNoticias)
router.delete('/noticias/eliminar', eliminarNoticia)
router.put('/noticias/actualizar', actualizarNoticia)
router.delete('/noticias/borrarTodo', borrarNoticiasPorEspacio)
module.exports = router
