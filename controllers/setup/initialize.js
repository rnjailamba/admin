var exportedApp = require('../../helpers/exporters/export_app');
var index = require('../index.js');
var blog = require('../blog.js');

exportedApp.app.use('/', index.router);
exportedApp.app.use('/blog', blog.router);

