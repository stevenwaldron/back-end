require('dotenv').config()
const App = require('./server.js')
const PORT = process.env.PORT || 3000;

App.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
})
