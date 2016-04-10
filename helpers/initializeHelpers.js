var exportedApp = require('./exporters/export_app');
var redisSetup = require('./Redis/setup.js');
var socketSetup = require('./Socket/setup.js');
var twilioSetup = require('./Twilio/setup.js');
var solrSetup = require('./Solr/setup.js'); 

var logginMiddleware = require('./login/api.js');
exportedApp.app.use('/loginMiddleware', logginMiddleware.router);
