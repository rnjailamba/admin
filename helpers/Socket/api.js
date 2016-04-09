var modules = require('../../controllers/setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();


module.exports.functions = {
  sayHelloInEnglish: function() {
    return "hello";
  },

  sayHelloInSpanish: function() {
    return "holla";
  }

};
