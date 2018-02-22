const winston = require('winston');

const loggers = {};

module.exports = name => {
  if (!loggers[name]) {
    winston.loggers.add(name, {
      console: {
        level: process.env.LOG_LEVEL,
        colorize: true,
        label: name
      }
    });
    loggers[name] = true;
  }

  return winston.loggers.get(name);
};
