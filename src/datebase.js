const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.mongoUrl

mongoose.connect(mongoUrl)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión:', err))
