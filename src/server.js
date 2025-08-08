const express = require('express')
const cors = require('cors')
const compression = require('compression')
// Inicialización de la app
const app = express()
// hace que el puerto sea el 3000
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(compression())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Access-Control-Allow-Request-Method',
    'KEY'
  ]
}))
// Rutas
app.use(require('./rutas/Noticias-rutas'))

module.exports = app
