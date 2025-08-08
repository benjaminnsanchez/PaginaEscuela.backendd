// se crea un objeto para guardar en el los metodos de noticias
const NoticiasCRL = {}
// importa el modelo y crea un item basandose en ese modelo
const Item = require('../models/Noticias')
// importa dotenv para las variables de entorno
require('dotenv').config()
// importa una funcion que te devuelve el espacio ocupado por en base de datos
const { verUsoDeAlmacenamiento } = require('../datebase')
// importa cloudinary , es par subir las imagenes a la nube
const cloudinary = require('cloudinary').v2
// configura cloudinary con su api<-key, api_secret y el nombre de la nube donde se van a guardar las imagenes
cloudinary.config({
  cloud_name: 'dtaounixm',
  // en estas dos se obtiene el valor de las api keys que se encuentran en el archivo .env
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})
// funcion para subir imagenes con un cierto formato recibiendo unn buffer y devolviendo el link de la imagen ya subida
function subirImagenABuffer (buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image', transformation: [{ width: 500, height: 300, crop: 'fill', gravity: 'auto' }, { fetch_format: 'webp', quality: 'auto' }] }, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    }).end(buffer)
  })
}
// metodo para crear una noticia
NoticiasCRL.crearNoticia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' })
    }
    // se le pasa el buffer enviado desde el front a la funcion para subir imagenes
    const result = await subirImagenABuffer(req.file.buffer)
    // recibe todos los datos enviados desde el front
    const params = req.body
    // crea una nueva noticia con los datos recibidos
    const noticia = new Item({
      titulo: params.titulo,
      desc_corta: params.desc_corta,
      desc_larga: params.desc_larga,
      cuerpo: params.cuerpo,
      fecha: params.fecha,
      imagen: result.secure_url,
      autor: params.autor,
      categoria: params.categoria
    })
    // guarda la noticia en la base de datos
    const savedNoticia = await noticia.save()
    res.status(201).json(savedNoticia)
  } catch (error) {
    console.error('Error al crear noticia:', error.message)
    res.status(500).json({ error: error.message })
  }
}
// metodo para obtener todas las noticias
NoticiasCRL.obtenerNoticias = async (req, res) => {
  try {
  // Realiza una búsqueda en la colección 'Item' (por ejemplo, noticias)
  // Ordena los resultados por la propiedad 'fecha' en orden descendente (más reciente primero)
    const items = await Item.find().sort({ fecha: -1 })
    // devuelve todas las noticias
    res.json(items)
  } catch (error) {
    console.error('Error al obtener noticias:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
NoticiasCRL.eliminarNoticia = async (req, res) => {
  const params = req.body
  try {
    const id = params.__id
    const noticiaEliminada = await Item.findByIdAndDelete(id)
    if (!noticiaEliminada) {
      res.status(200).json({ message: 'Noticia no se encontro' })
    }
    res.status(200).json({ message: 'Noticia eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
NoticiasCRL.actualizarNoticia = async (req, res) => {
  const params = req.body
  try {
    const id = params.__id

    let imagenFinal = params.imagen // Imagen por defecto (la que ya existe)

    // Si se envía una nueva imagen desde el frontend
    if (req.file) {
      // Se sube el buffer a Cloudinary
      const result = await subirImagenABuffer(req.file.buffer)
      imagenFinal = result.secure_url // Se actualiza la URL de la imagen
    }

    // Se actualiza la noticia con los nuevos datos
    const noticiaActualizada = await Item.findByIdAndUpdate(
      id,
      {
        titulo: params.titulo,
        desc_corta: params.desc_corta,
        desc_larga: params.desc_larga,
        cuerpo: params.cuerpo,
        fecha: params.fecha,
        imagen: imagenFinal, // Usa la imagen nueva o la existente
        autor: params.autor,
        categoria: params.categoria
      },
      { new: true } // Devuelve el documento actualizado
    )

    // Si no se encuentra la noticia, responde con error 404
    if (!noticiaActualizada) {
      return res.status(404).json({ error: 'Noticia no encontrada' })
    }

    // Devuelve la noticia actualizada
    res.json(noticiaActualizada)
  } catch (error) {
    console.error('Error al actualizar noticia:', error.message)
    res.status(500).json({ error: 'Error al actualizar la noticia' })
  }
}

// no le des importancia por ahora
NoticiasCRL.borrarNoticiasPorEspacio = async (req, res) => {
  try {
    if (await verUsoDeAlmacenamiento() > 1) {
      await Item.deleteMany({})
    } else {
      res.status(500).json({ message: 'no se pasaron el almacenamiento limite' })
    }
    res.status(200).json({ message: 'Noticias eliminadas correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = NoticiasCRL
