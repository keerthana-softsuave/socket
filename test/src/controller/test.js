const fs = require("fs")
const zlib = require("zlib")
const { Readable } = require('stream');
// const app = require('http').createServer();
// const io = require('socket.io')(app);

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const userSocketMap = new Map();
 const testing = (req, res) => {
    console.log("Hai")
    
    io.on("connection", (socket)=> {
        console.log("The connection established")
        socket.on("setUserId", (userId)=>{
            console.log("The user of ${userId} is connected")
            userSocketMap.set(userId, socket.id)
        })
    })
  
    


 }




























const reader = (req,res)=>{
   const readable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt", "utf-8") 
   readable.on("data", (chunk)=> res.write(chunk) )
   readable.on("end", () => res.end())
   readable.on("error", () => res.error())
}


const writeIntoZip = (req, res) =>{
    fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("../sample.zip")))

}

const pause = (req, res) =>{
    const readable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt", "utf-8")
    readable .on("data", (chunk)=>{
        res.write(chunk)

        readable.pause()
        setTimeout(()=>{
            readable.resume()
            console.log("resumed")
        
        }, 5000)
        
    })

}

const empty =(req, res) => {
    const readable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/sample.zip", "utf-8")
    readable.on("data", (chunk)=> console.log("read the chunk", chunk) ) 
    // data event is not emited as the file is empty
   readable.on("end", () => console.log("end")) 
   // directly end  event  is emited
  
}

const writer = (req, res) => {
    const readable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt", "utf-8")
    const  writable = fs.createWriteStream("C:/Users/Softsuave/Desktop/test/sample.zip")
    writable.write("The data here")
    console.log(writable.destroyed)
    writable.write(" data before calling destroy")
    //writable.destroy()
    console.log(writable.destroyed)
    writable.write(" The data after calling destroy")
    readable.pipe(writable)
    readable.on("data", (chunk)=> res.write(chunk) )


}

const read = (req,res)=>{
    const readable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt", "utf-8") 
    const x = readable.read()
    console.log(x)
    readable.on("data", (chunk)=> res.write(chunk) )
    readable.on("end", () => res.end())
    readable.on("error", () => res.error())
 }

 const wrap = (req, res) => {
    const  writable = fs.createReadStream("C:/Users/Softsuave/Desktop/test/sample.zip") 
    //const  read = fs.createReadStream("C:/Users/Softsuave/Desktop/test/test/src/controller/sample.txt", "utf-8") 
    const readable = Readable.wrap(writable)

    readable.on("data", (chunk) => {
        console.log('Received data:', chunk);
        
        
    })


 }

 const push = (req, res) =>{
    const readable = new Readable({
        read(size) {
         
        }
      });
      
      
    
      readable.on('data', (chunk) => {
        console.log(chunk.toString()); 
      });

 }

 const map = (req, res) =>{

    // for (const c of Readable.from([1, 2, 3, 4]).map((x) => x * 2)) {
    //     console.log(c); // 2, 4, 6, 8
    //   }

    //   const k= [2,4,6,8]
    //   for(const chunk of Readable.filter((x)=> x>2)){
    //     console.log(chunk)
    //   }

    for (const chunk of Readable.from([1, 2, 3, 4]).filter((x) => x > 2)) {
        console.log(chunk); // 3, 4







}
 }
 





module.exports= {
    testing,
    reader,
    writeIntoZip,
    pause,
    empty,
    writer, 
    read, 
    wrap,
    push,
    map
}