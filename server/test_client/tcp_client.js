const net = require('net');
const client = new net.Socket();
const port = 7070;
// const host = '127.0.0.1';
const host = '172.29.105.91';

client.connect(port, host, function() {
    console.log('Connected');
    client.write("Hello From Client " + client.address().address + '\r\n');
    
    client.on('data', function(data) {
        console.log('Server Says : ' + data);
    });

    client.on('close', function() {
        console.log('Connection closed');
        client.destroy();
    });
});