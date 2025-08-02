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
module.exports = NoticiasCRL
