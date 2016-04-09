var exportedApp = require('./export_app');
var index = require('../index.js');

exportedApp.app.use('/', index.router);

