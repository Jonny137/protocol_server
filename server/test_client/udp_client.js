var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = Buffer.from('Hello from UDP client!');

var client = dgram.createSocket('udp4');

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
//   client.close();
});

client.on('message', function(msg,info) {
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
  });
