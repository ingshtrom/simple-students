var server = require('./hapi-server');
var api = require('./api/index');
var Database = require('./database').class;
var Student = require('./api/Student').class;

module.exports = function() {
  var myHapi = server.start();
  var options = {};

  options.database = new Database();
  options.student = new Student(options);

  api.configure(myHapi, options);

  return myHapi;
};
