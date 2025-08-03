const NoticiasCRL = {}
const Item = require('../models/Noticias')
NoticiasCRL.crearNoticia = async (req, res) => {
  try {
    const params = req.body
    const noticia = new Item({
      titulo: params.titulo,
      desc_corta: params.desc_corta,
      desc_larga: params.desc_larga,
      fecha: params.fecha,
      imagen: params.imagen,
      autor: params.autor,
      categoria: params.categoria
    })

    const savedNoticia = await noticia.save()
    res.status(201).json(savedNoticia)
  } catch (error) {
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

module.exports = NoticiasCRL
