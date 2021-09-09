const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  socket.on('disconnect', () => {})

  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('message', msg)
  })
})

const PORT = 5000
server.listen(PORT, () => {
  console.log(`Port ${PORT} is listening`)
})
