const express = require('express')
const path = require('path')

// Inicialización de la app
const app = express()
// Settings
app.set('port', process.env.PORT || 3000)
// Middlewares
app.use(express.urlencoded({ extended: false }))
// Variables
// Rutas
app.use(require('./rutas/Noticias-rutas'))
// archivo estático
app.use(express.static(path.join(__dirname, 'public')))
module.exports = app
