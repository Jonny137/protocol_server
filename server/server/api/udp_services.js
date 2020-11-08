// UDP library
const dgram = require('dgram');
const socketIo = require('socket.io');
const express = require('express');
const http = require('http');
const time = require('../utils/timestamp');
// Socket.io for data catch/forward to UI
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 4001;

const udpPort = 33333;
const udpHost = '127.0.0.1';

// Echo flag
let echo = false;

io.on('connection', (socket) => {
    const connTime = time.getTimestamp();
    let recvAddress = '';
    let recvPort = '';
    
    // Get list of connected clients on socket.io
    io.clients((error, clients) => {
        if (error) throw error;
        console.log(clients); 
    });

    console.log(`${connTime} UDP CONNECTED`);
    let udpServer = dgram.createSocket('udp4').bind(udpPort, udpHost);

    udpServer.on('message', function(message, remote) {
        const recvTime = time.getTimestamp();
        const recMessage = remote.address + ':' + remote.port +' - ' + message;
        recvAddress = remote.address;
        recvPort = remote.port;
        socket.emit('recvUdpMessage', `${recvTime} Received client message from: ${recMessage} (${recMessage.length} B)`);
        if (!echo) {
            udpServer.send(recMessage, 0, recMessage.length, remote.port, remote.address, function(err, bytes) {
                if (err) throw err; 
                socket.emit('recvUdpMessage', `${recvTime} Server echoed: ${recMessage} (${recMessage.length} B)`);
            });
        }
    });

    udpServer.on('error', function (message, remote) {
        const sendTime = time.getTimestamp();
        console.log('UDP Error: ' + error);
        socket.emit('recvUdpMessage', `${sendTime} Error occured, please refresh the page!:`)
        server.close();
    });

    socket.on('sendUdpMessage', (msg) => {
        const sendTime = time.getTimestamp();
        const serverMessage = Buffer.from(msg);
        udpServer.send(serverMessage, recvPort, recvAddress);
        socket.emit('recvUdpMessage', `${sendTime} Server sent message to: ${recvAddress}:${recvPort} - ${msg} (${serverMessage.length} B)`);
    });

    socket.on('udpEcho', (value) => {
        echo = value;
    });
    
    socket.on('disconnect', () => {
        const discTime = time.getTimestamp();
        console.log(`${discTime} UDP DISCONNECTED`);
        udpServer.close();
        udpServer = null;
    });
});

server.listen(port, () => console.log(`UDP server listening on: ${udpPort}`));
