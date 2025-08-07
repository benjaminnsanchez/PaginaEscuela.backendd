const NoticiasCRL = {}
const Item = require('../models/Noticias')
require('dotenv').config()
const { verUsoDeAlmacenamiento } = require('../datebase')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dtaounixm',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})
function subirImagenABuffer (buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image', transformation: [{ width: 500, height: 300, crop: 'fill', gravity: 'auto' }, { fetch_format: 'webp', quality: 'auto' }] }, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    }).end(buffer)
  })
}

NoticiasCRL.crearNoticia = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' })
    }

    const result = await subirImagenABuffer(req.file.buffer)
    const params = req.body

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

    const savedNoticia = await noticia.save()
    res.status(201).json(savedNoticia)
  } catch (error) {
    console.error('Error al crear noticia:', error.message)
    res.status(500).json({ error: error.message })
  }
}
NoticiasCRL.obtenerNoticias = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query
    const items = await Item.find()
      .sort({ fecha: -1 })
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
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
    const noticiaActualizado = await Item.findByIdAndUpdate(id,
      {
        titulo: params.titulo,
        desc_corta: params.desc_corta,
        desc_larga: params.desc_larga,
        cuerpo: params.cuerpo,
        fecha: params.fecha,
        imagen: params.imagen,
        autor: params.autor,
        categoria: params.categoria
      }, { new: true }
    )
    if (!noticiaActualizado) {
      return res.status(404).json({ error: 'Noticia no encontrada' })
    }
    res.json(noticiaActualizado)
  } catch {
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}
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
