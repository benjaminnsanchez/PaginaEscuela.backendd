require('dotenv').config()
require('./datebase')
const app = require('./server')
// Aca se pone a arrancar el server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})
