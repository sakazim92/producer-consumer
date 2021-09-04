var express = require('express');
var app = express();
//initializing express sever for sending updates to client
var server = require("http").Server(app);
//initializing socket.io for sending updates to client
var io = require("socket.io")(server);
const net = require('net')
const http = require('http')
const { generate } = require('../utils/expression.utility')
const config = require('../utils/config.utility')

io.on("connection", (socket) => {
});

/**
 * @param  {socket} Consumer socket to send expressions
 */
const initServer = (socket) => {
    const server = http.createServer(async (req, res) => {
        if(req.url === "/generate"){
            const expression = generate()
            res.end(`Generated Expression: ${expression}`)
            socket.write(expression)
            console.log(`Generated: ${expression}`)
            //sending update to client via socket.io
            io.emit('producer-client', `Generated: ${expression}`)
        }
        else{
            res.end(`Hello from Producer!`)
        }
    })

    server.listen(config.PRODUCER_PORT, () => console.log(`Producer running on port ${config.PRODUCER_PORT}`))
}

/**
 * On service start up connects to consumer socket,
 */
const socket = net.connect({port: config.CONSUMER_PORT}, () => {
    console.log('connected to consumer')
}) 

//Initiate producer http server to listen '/generate' route
socket.on('connect', (data) => {
    initServer(socket)
})

//Handles data coming in from consumer
socket.on('data', (data) => {
    console.log(`Received: ${data}`)
    //sending update to client via socket.io
    io.emit('producer-client', `Received: ${data}`)
})

socket.on('close', () => {
    console.log('disconnected from consumer!')
    process.exit()
})

socket.on('error', (err) => {
    console.log({err})
})

server.listen(config.PRODUCER_SOCKET_IO_PORT);
