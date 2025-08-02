const mongoose = require('mongoose')
const mongoUrl = process.env.mongoUrl
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log('Database is connected'))
  .catch((err) => console.error(err))
module.exports = mongoose
