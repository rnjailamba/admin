var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
var loginMiddleWare = require("../helpers/login/api.js");

// PING
// ============================================== 
router.get('/ping', function(req, res){
   
    res.render('index/ping', { title: 'Express' });


});


// INDEX
// ============================================== 
router.get('/', function(req, res){
   	
  	loginMiddleWare.functions.isLoggedInWithRender(req,res,redisClient,'index/landing',null);

});


// NOT LOGGED IN
// ============================================== 
router.get('/notLoggedIn', function(req, res){
	
    res.render('index/notLoggedIn', { title: 'Express' });

});


var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
