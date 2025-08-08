const { Router } = require('express')
const multer = require('multer')
const router = Router()
// para poder recibir formdata
const upload = multer({ storage: multer.memoryStorage() })
// se importan todos los metodos declarados en noticias-c.js
const { crearNoticia, obtenerNoticias, eliminarNoticia, actualizarNoticia, borrarNoticiasPorEspacio } = require('../controladores/noticias-c')
// se declaran los metodos http con los metodos importados
router.post('/noticias/agregar', upload.single('image'), crearNoticia)
router.get('/noticias/obtenerTodas', obtenerNoticias)
router.delete('/noticias/eliminar', eliminarNoticia)
router.put('/noticias/actualizar', actualizarNoticia)
router.delete('/noticias/borrarTodo', borrarNoticiasPorEspacio)
module.exports = router
