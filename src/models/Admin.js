// importa lo necesario para poder crear un esquema
const { Schema, model } = require('mongoose')
// esto sirve para encriptar la contraseña
const bcrypt = require('bcryptjs')
// esquma basico ( modificar)
const adminSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
// se exporta el modelo
module.exports = model('Admin', adminSchema)
// se crea un metodo cifrar que recibe la contraseña y la devuelve encriptada (no se si funciona)
adminSchema.methods.cifrar = async contraseña => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(contraseña, salt)
  return hash
}
// metodo para comparar la contraseña con la contraswña encriptada (no probe tampoco)
adminSchema.methods.comparar = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.password)
}
