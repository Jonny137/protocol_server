// TCP library
const net = require('net');
const socketIo = require('socket.io');
const express = require('express');
const http = require('http');
const time = require('../utils/timestamp');
// Express and server socket.io for communication with front-end
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 4000;

// Port and Host address
const tcpPort = 7070;
const tcpHost = '127.0.0.1';

// Array to holds multiple sockets
let sockets = [];

// Echo flag
let echo = false;

io.on('connection', (socket) => {
    const connTime = time.getTimestamp();

    console.log(`${connTime} TCP CONNECTED`);
    const tcpServer = net.createServer();

    // TCP server listener
    tcpServer.listen(tcpPort, tcpHost);

    // TCP client connection
    tcpServer.on('connection', function(tcpSocket) {
        console.log('TCP client connected: ' + tcpSocket.remoteAddress + ':' + tcpSocket.remotePort);
        sockets.push(tcpSocket);
        // Set encoding to string
        tcpSocket.setEncoding('utf8');
    
        // Handle client message
        tcpSocket.on('data', function(data) {
            const recvTime = time.getTimestamp();
            let slicedData = data.toString();
            slicedData = slicedData.replace(/(\r\n|\n|\r)/gm, '');
            console.log(slicedData);
            // Log data from the client
            console.log(`${recvTime} ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} message: ${slicedData}`);
            socket.emit(
                'clientMessage', 
                `${recvTime} ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} Received client message: ${slicedData} (${data.length} B)`
            );
            // Send back the data to the client depending on echo flag
            if (echo) {
                const sendTime = time.getTimestamp();
                tcpSocket.write(`${sendTime} Server echoed: ${data}\r\n`);
                socket.emit(
                    'clientMessage', 
                    `${sendTime} Server echoed to: ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} - ${data} (${data.length} B)`
                );
            }
        });
        
        // Handle client connection termination
        tcpSocket.on('close', function() {
            const sendTime = time.getTimestamp();
            console.log(`${sendTime} Client ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} - Terminated the connection`);
            socket.emit(
                'clientMessage', 
                `${sendTime} ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} Terminated the connection`
            );
            let index = sockets.findIndex(function(o) {
                return o.remoteAddress === tcpSocket.remoteAddress && o.remotePort === tcpSocket.remotePort;
            });
            if (index !== -1) {
                sockets.splice(index, 1);
            }
        });

        // Handle client connection error
        tcpSocket.on('error', function(error) {
            const sendTime = time.getTimestamp();
            console.error(`${sendTime} ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} Connection Error ${error}`);
        });

        // Send the message to the UI client socket.io
        socket.on('serverMessage', (msg) => {
            const sendTime = time.getTimestamp();
            const buffMessage = Buffer.from(msg);
            tcpSocket.write(`${sendTime} Server message: ${msg} \r\n`);
            sockets.forEach(sck => {
                if (sockets.includes(tcpSocket)) {
                    socket.emit(
                        'clientMessage', 
                        `${sendTime} Server message to: ${tcpSocket.remoteAddress}:${tcpSocket.remotePort} - ${msg} (${buffMessage.length} B)`
                    );
                }
            });
        });
    });

    // Echo change socket handler
    socket.on('tcpEcho', (value) => {
        echo = value;
    });

    // Disconnect handler
    socket.on('disconnect', () => {
        const discTime = time.getTimestamp();
        console.log(`${discTime} TCP SOCKET DISCONNECTED`);
        tcpServer.close();
    });
});

server.listen(port, () => console.log(`TCP server listening on: ${tcpPort}`));