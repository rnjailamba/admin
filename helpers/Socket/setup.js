var exportedApp = require('../../controllers/setup/export_app');
var http = require("http");
var server = http.createServer(exportedApp.app);
var io = require("socket.io")(server);
server.listen(2000);

console.log("in socket");

io.on('connection', function(socket){
  console.log('a user connected original');
});

var index = require('../../controllers/index.js');
index.setIOobject(io);