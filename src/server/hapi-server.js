var Hapi = require('hapi'),
    logger = require('./logger'),
    config = require('./app-config'),
    packConfig = require('./hapi-pack-config').config;

module.exports.start = function() {
  var server = {};

  server = new Hapi.Server(config.server.port);
  server = packConfig(server);
  server.start(function() {
    logger.debug('Server running at:', server.info.uri);
  });
  return server;
};