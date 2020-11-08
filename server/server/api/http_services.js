const http = require('http');
const socketIo = require('socket.io');
const time = require('../utils/timestamp');
// Host and port init
const httpHost = '127.0.0.1';
const httpPort = 5000;
let httpSocket;

const httpServer = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Handle GET request
        const getTime = time.getTimestamp();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('HTTP server response message');
        res.end();
        const socketPaylod = {
            code: 200,
            contentType: 'text/plain',
            content: 'HTTP server GET response'
        }
        httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
    } else if (req.method === 'POST') {
        // Handle POST request
        const contentType = req.headers['content-type'];
        const getTime = time.getTimestamp();
        // Parse data as bytes
        let requestBody = [];
        req.on('data', (chunks) => {
            requestBody.push(chunks);
        });
        req.on('end', () => {
            // Convert Buffer to String and add it to the response
            requestBody = requestBody.toString();
            if (contentType === 'application/x-www-form-urlencoded') {
                res.writeHead(200, { 'Content-Type': 'application/x-www-form-urlencoded' });
                res.write(JSON.stringify({
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Payload': requestBody 
                }));
                res.end();
                const socketPaylod = {
                    code: 200,
                    contentType: 'application/x-www-form-urlencoded',
                    content: requestBody
                }
                httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
            } else if (contentType === 'text/plain') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(JSON.stringify({
                    'Content-Type': 'text/plain',
                    'Payload': requestBody 
                }));
                res.end();
                const socketPaylod = {
                    code: 200,
                    contentType: 'text/plain',
                    content: requestBody
                }
                httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
            } else if (contentType === 'application/octet-stream') {
                res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
                res.write(JSON.stringify({
                    'Content-Type': 'application/octet-stream',
                    'Payload': requestBody 
                }));
                res.end();
                const socketPaylod = {
                    code: 200,
                    contentType: 'application/octet-stream',
                    content: requestBody
                }
                httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
            } else if (contentType === 'multipart/form-data') {
                res.writeHead(200, { 'Content-Type': 'multipart/form-data' });
                res.write(JSON.stringify({
                    'Content-Type': 'multipart/form-data',
                    'Payload': requestBody 
                }));
                res.end();
                const socketPaylod = {
                    code: 200,
                    contentType: 'multipart/form-data',
                    content: requestBody
                }
                httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write(`Unsupported [Content-Type] header!`);
                res.end();
                const socketPaylod = {
                    code: 200,
                    contentType: 'text/plain',
                    content: 'Unsupported [Content-Type] header!'
                }
                httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
            }
        });
    } else {
        // Send error, invalid method
        const getTime = time.getTimestamp();
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Unsupported method!');
        res.end();
        const socketPaylod = {
            code: 400,
            contentType: 'text/plain',
            content: 'Unsupported method!'
        }
        httpSocket.emit('httpMessage', getTime + ' ' + JSON.stringify(socketPaylod));
    }
});

// Socket.io init
const io = socketIo(httpServer);

io.on('connection', (socket) => {
    const connTime = time.getTimestamp();
    console.log(`${connTime} HTTP CONNECTED`);
    httpSocket = socket;
});

httpServer.listen(httpPort, httpHost, () => console.log(`HTTP server listening at ${httpHost}:${httpPort}`));