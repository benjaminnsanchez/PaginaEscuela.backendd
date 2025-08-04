const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error(' Error de conexión:', err))
const { MongoClient } = require('mongodb')

async function verUsoDeAlmacenamiento () {
  await mongoose.connect(mongoUrl)

  const client = new MongoClient(mongoUrl)
  await client.connect()

  const db = client.db('DB_general')

  try {
    const stats = await db.command({ dbStats: 1 })
    return stats.dataSize
  } catch (err) {
    console.error('Error al obtener estadísticas:', err)
  } finally {
    await client.close()
  }
}
module.exports = {
  verUsoDeAlmacenamiento
}
