const express = require("express")
const app = express()
app.use(express.json())


const http = require('http').Server(app);

const io = require('socket.io')(http);
const path = require("path")



app.get('/', (req, res) => {
  var options = {
    root : path.join(__dirname)
  }
  const fileName = "index.html"
  res.sendFile(fileName, options)
});


  
  
  const users= {}



  io.on("connection", (socket)=>{
    console.log("A user is connected")

    // socket.on("message", (msg)=>{
    //   console.log(`This message: '${msg}' from client`)
    // })

    socket.emit("serverToClient", "Message from server to client")
    
    socket.on("disconnect",()=>{
      console.log("User got disconnected")
    })
  })






const channel = io.of('/channel1')
channel.on("connection", (socket)=>{
  console.log("channel1 connected")

  channel.emit('channel', "from channel 1")




  socket.on('disconnect',()=>{
    console.log("channel1 disconnected")

  })
})


  const channel2 = io.of('/channel2')
  // channel2.on('connection', (socket)=>{
  //   console.log("channel2 connected")

  //   socket.on('channel', (data)=>{
  //     console.log(data)

  //   })




  //   socket.on('dissconnect', ()=>{
  //     console.log("channel2 disconnected")
  //   })
  // })

















const testRouter = require("./src/router/router")

var cors = require('cors');
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],
    
  };
  app.use(cors(corsOpts));

const port = 3030


app.use("/testRouter", testRouter)


http.listen(port, ()=>{
    console.log(`Listing in ${port}`)
})
