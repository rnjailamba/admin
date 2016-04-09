var redis = require('redis');
var redisClient = redis.createClient().on('connect', function() {
     console.log('connected to redis in helper');
 }); //creates a new client


var index = require('../../controllers/index.js');
index.setRedisClient(redisClient);

