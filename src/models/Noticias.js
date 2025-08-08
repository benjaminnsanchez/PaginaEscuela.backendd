// importa lo necesario para poder crear un esquema
const { Schema, model } = require('mongoose')
// se crea un nuevo esquema
const noticiaSchema = new Schema({
  titulo:
  {
    type: String,
    required: true
  },
  desc_corta:
  {
    type: String,
    required: true
  },
  desc_larga:
  {
    type: String,
    required: true
  },
  cuerpo:
  {
    type: String,
    required: true
  },
  fecha:
  {
    type: Date,
    // pone la fecha en la que e crea la noticia
    default: Date.now
  },
  imagen:
  {
    type: String,
    required: true
  },
  autor:
    {
      type: String,
      required: true
    },
  categoria:
    {
      type: String,
      required: true
    }
})
// exporta el modelo
module.exports = model('Noticias', noticiaSchema)
