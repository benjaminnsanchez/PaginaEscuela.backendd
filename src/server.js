const express = require('express')
const path = require('path')
const cors = require('cors')
// Inicialización de la app
const app = express()
// Settings
app.set('port', process.env.PORT || 3000)
// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
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
// archivo estático
app.use(express.static(path.join(__dirname, 'public')))
module.exports = app
