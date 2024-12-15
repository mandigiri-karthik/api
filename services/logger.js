// services/logger.js
const winston = require('winston');

// Set up the logger with desired configurations
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/canvas-exports.log' })  // Saving logs to a file
  ]
});

module.exports = logger;
