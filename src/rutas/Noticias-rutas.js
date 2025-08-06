const { Router } = require('express')
const multer = require('multer')
const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const { crearNoticia, obtenerNoticias, eliminarNoticia, actualizarNoticia, borrarNoticiasPorEspacio } = require('../controladores/noticias-c')
router.post('/noticias/agregar', upload.single('image'), crearNoticia)
router.get('/noticias/obtenerTodas', obtenerNoticias)
router.delete('/noticias/eliminar', eliminarNoticia)
router.put('/noticias/actualizar', actualizarNoticia)
router.delete('/noticias/borrarTodo', borrarNoticiasPorEspacio)
module.exports = router
