# ws-application
// import the express and express-ws libraries
const express = require('express')
const expressWs = require ('express-ws')

// create a new express application
const app = express()
// implement web sockets
expressWs(app)

// Create a new set to hold each clients socket connection
const connections = new Set()

//Handler called when a new websocket connection is made
const wsHandler = (ws) => {
    connections.add(ws)
    ws.on('message',(message)=>{
        connections.forEach((conn) => conn.send(message))
    })
    // disconnects the handler is called to close
    ws.on('close',()=>{
        // once closed the connection is removed from the set
        connections.delete(ws)
    })
}

// adding websocket handler to the chat
app.ws('/chat', wsHandler)
// build directory host
app.use(express.static('build'))
// start the server to listen and accept connections
app.listen(3000)
