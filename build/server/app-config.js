var path = require('path');

/**
 * General app configuration
 * @type {Object}
*/
module.exports.app = {
  root: path.resolve(__dirname, '../../')
};

/**
 * Server configuration
 * @type {Object}
 */
module.exports.server = {
  port: 3000
};

// the root for all logging
var logRoot = path.resolve(module.exports.app.root, 'logs');

/**
 * Logger configuration
 * @type {Object}
 */
module.exports.logger = {
  logDir: logRoot,
  defaultLogFile: path.resolve(logRoot, "app"),
  logLevel: 'silly',
  maxFileSize: 102400,
};
