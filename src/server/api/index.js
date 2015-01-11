var appConfig = require('../app-config').app;
var path = require('path');

module.exports.configure = function(server, options) {
  var configs = options.student.buildConfigs();

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.resolve(appConfig.root, 'build/client'),
        index: true
      }
    }
  });

  server.route({
    method: 'GET',
    path:'/healthCheck',
    config: {
      handler: function(request, reply) {
        reply();
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/students',
    config: configs.getAllStudents
  });

  server.route({
    method: 'POST',
    path:'/students',
    config: configs.createStudent
  });

  server.route({
    method: 'GET',
    path: '/student/{id}',
    config: configs.getStudent
  });

  server.route({
    method: 'PUT',
    path: '/student/{id}',
    config: configs.updateStudent
  });

  server.route({
    method: 'DELETE',
    path: '/student/{id}',
    config: configs.deleteStudent
  });

  return server;
};
