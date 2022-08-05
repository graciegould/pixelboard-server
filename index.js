'use strict';
const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 4001;
let lastSocket = "";
let picked = null;
const server = express()
  .use((req, res) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    res.send(picked)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  },
});


const cleared = ()=>{
   picked = {};
  for (let x = 0; x < 1600; x += 16) {
    for (let y = 0; y < 900; y += 16) {
     picked[ x+"-"+y]={x:x, y:y, color:"white"}
    }
  }
}
io.on('connection', (socket) => {
if(picked ===null){
  picked = [];
  cleared();
}
  socket.on("connection", (data) => {
  })
  socket.on("choice", (data)=>{
    socket.broadcast.emit("addChoice", data)
    picked[data.pos[0]+"-"+data.pos[1]].color = data.color
  })
  socket.on('disconnect', function () {

  })
});

