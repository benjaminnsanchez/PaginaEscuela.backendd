const { Schema, model } = require('mongoose')
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
  fecha:
  {
    type: Date,
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
module.exports = model('Noticias', noticiaSchema)