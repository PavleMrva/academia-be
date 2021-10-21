const expressPinoLogger = require('express-pino-logger');
const logger = require('../libs/logger');

module.exports = expressPinoLogger({
  // specify the logger
  logger: logger,
  // level to log
  useLevel: 'http',
});

