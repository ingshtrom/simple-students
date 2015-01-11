var path = require('path'),
    config = require('./app-config'),
    pkg = require('../../package.json');


module.exports.config = function(server) {
  var logFile, options;

  logFile = path.resolve(config.logger.logDir, "stats.log");

  options = {
    opsInterval: 60 * 1000,
    reporters: [
      {
        reporter: require('good-console'),
        args:[{ ops: '*', request: '*', log: '*', error: '*' }]
      }, {
        reporter: require('good-file'),
        args: [
          config.logger.defaultLogFile + '-stats',
          { ops: '*', request: '*', log: '*', error: '*' }
        ]
      }
    ]
  };

  server.pack.register({
    plugin: require('good'),
    options: options
  }, function(err) {
    if (err) {
      logger.error("Failed to load Hapi plugin 'good': ", err);
    }
  });

  return server;
};
