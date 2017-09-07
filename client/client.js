var net  = require('net');
var fs   = require('fs');
var path = require('path');
var mime = require('mime');

var server = net.connect({port: 4000}, '127.0.0.1', function() {
   console.log('connected to server!');
});


server.on('data', function(data) {
   let command = data.toString();
   if (command == 'play') {
    PlaySong();
   }
   //client.end();
});

server.on('end', function() {
   console.log('Disconnected from server');
});

function PlaySong() {
  fs.readdir('/home/ir/Music', function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    let item = files[Math.floor(Math.random()*files.length)];
    var absolutePath = path.resolve('/home/ir/Music/2.mp3');
    console.log(absolutePath);
    let readStream = fs.createReadStream(absolutePath);
    let dataLength = 0;

    readStream.on('data', function (chunk) {
        server.write(chunk);
        dataLength += chunk.length;
      }).on('end', function () {  // done
        console.log('The length was:', dataLength);
    });
  });
}
