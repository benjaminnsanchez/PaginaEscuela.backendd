const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
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
model('Admin', adminSchema)
module.exports = model('Admin', adminSchema)
adminSchema.methods.cifrar = async contraseña => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(contraseña, salt)
  return hash
}
adminSchema.methods.comparar = async function (contraseña) {
  return await bcrypt.compare(contraseña, this.password)
}
