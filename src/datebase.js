const mongoose = require('mongoose')
const mongoUrl = process.env.mongoUrl
mongoose
  .connect(mongoUrl, {

  })
  .then((db) => console.log('Database is connected'))
  .catch((err) => console.error(err))
module.exports = mongoose
