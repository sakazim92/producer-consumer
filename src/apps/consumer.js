var express = require('express');
var app = express();
//initializing express sever for sending updates to client
var server = require("http").Server(app);
//initializing socket.io for sending updates to client
var io = require("socket.io")(server); 
const net = require('net')
const config = require('../utils/config.utility')
const { compute } = require('../utils/expression.utility');
const { setInterval } = require('timers');
let client = null

const consumer = net.createServer((socket) => {
    setInterval(() => {
        if(client) client.write('message')
    }, 2000)
    registerSocketEvents(socket)
})

io.on("connection", (socket) => {
});

/**
 * Event handlers for socket server (Consumer)
 * @param  {socket} 
 */
function registerSocketEvents(socket) {
    socket.on('data', (data) => {
        data = data.toString()
        console.log(`Process: ${data}`)
        //sending update to client via socket.io
        io.emit('consumer-client', `Process: ${data}`)
        processData(data, socket)
     });

    socket.on('end', () => {
        console.log(`producer on port ${socket.remotePort} disconnected!`)
     });
     
     socket.on('error', (err) => {
        console.log({err})
     })
}

/**
 * Dequeue an expression, solve, log the solution,
 * and send back to producer
 */
function processData(expression, producer) {
    if(expression){
        const solution = expression + compute(expression)
        console.log(`solution: ${solution}`)
        producer.write(solution);
        //sending update to client via socket.io
        io.emit('consumer-client', `Solved: ${solution}`)
    }
}

consumer.listen(config.CONSUMER_PORT, function() { 
    console.log(`Consumer is listening on port: ${config.CONSUMER_PORT}`);
})

server.listen(config.CONSUMER_SOCKET_IO_PORT);
