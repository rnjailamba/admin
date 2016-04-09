var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta

var redisClient;
module.exports.setRedisClient = function(inClient) { redisClient = inClient; };
modules.winston.log('debug', 'Hello again distributed log files!');


var io;
module.exports.setIOobject = function(inIO) { io = inIO; };


var socketAPI = require('../helpers/Socket/api.js'); // get the socket apis from the helpers folder


// PING
// ============================================== 
router.get('/ping', function(req, res){
     redisClient.select(1, function(err,res){

        redisClient.set("abc", "xyz", function(err, reply) {
           console.log("have set",reply);
        });

        redisClient.get("abc", function(err, reply) {
           console.log("am getting",reply);

        });
    });

    var sayHelloInEnglish = socketAPI.functions.sayHelloInEnglish;
    console.log(sayHelloInEnglish());

    // the important parts of echo server
    io.on("connection", function (socket) {
            console.log('a user connectedddd');
        socket.on("echo", function (msg, callback) {

            callback = callback || function () {};

            socket.emit("echo", msg);

            callback(null, "Done.");
        });
    });

//    res.status(200).send("Ping");
    res.render('index/ping', { title: 'Express' });

});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
