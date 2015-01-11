var winston = require('winston'),
    config = require('./app-config');

require('string').extendPrototype();


var getLogger = function() {
  consoleConfig = {
    level: config.logger.logLevel,
    handleExceptions: true,
    colorize: true,
    timestamp: true
  };
  fileConfig = {
    filename: config.logger.defaultLogFile + '.log',
    level: config.logger.logLevel,
    maxsize: config.logger.maxFileSize,
    handleExceptions: true
  };

  return new winston.Logger({
    transports: [
      new winston.transports.Console(consoleConfig),
      new winston.transports.File(fileConfig)
    ],
    exitOnError: false
  });
};

module.exports = getLogger();
