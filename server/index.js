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
  console.log('a user mysteriously appeared')
  socket.on('disconnect', () => {
    console.log('a user mysteriously vanished')
  })

  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('message', msg)
  })
})

server.listen(5000, () => {
  console.log('Port 5000 is listening')
})

// const app = require('express')()
// const http = require('http').Server(app)
// const io = require('socket.io')(http)
// const port = process.env.PORT || 5000

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg)
//   })
// })

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`)
// })
