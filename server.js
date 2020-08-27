const express = require('express')
const server = express()
const usersRouter = require('./routers/usersRouter')


server.use(express.json())
server.use('/users',usersRouter)


module.exports = server
