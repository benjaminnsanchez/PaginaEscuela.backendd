require('dotenv').config()
const app = require('./server')
require('./datebase')
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})
