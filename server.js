var fs   = require('fs');
var path = require('path');
var mime = require('mime');
var net  = require('net');
var sys  = require('util')
var exec = require('child_process').exec;

// // Create HTTP server, using  anonymous function to define per-request behavior
var clients = new Array;
var server = net.createServer(function(connection) {
  client = client_address(connection);
  console.log(client + ' client connected\n');

  // Adding to Client List.
  clients.push(client);

  // On Connection Closed
  connection.on('end', function(connection) {
    console.log(client + ' client disconnected\n');
  });
  connection.write("play");

  files = new Array;

  connection.on('data', function(data) {
    child = exec("mplayer mpst http://" + clients[0] + " " + data, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  });
});

server.listen(4000, function() {
   console.log('server is listening at 4000\n');
});

// Getting Client Address
function client_address(connection) {
  let client_ip = connection.remoteAddress;
  // To String
  client_ip = client_ip.toString().substr(7);
  let client_port = connection.remotePort;
  let address = client_ip + ":" + client_port;

  return address;
}
