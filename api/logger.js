const winston = require('winston');

const loggers = {};

module.exports = name => {
  if (!loggers[name]) {
    winston.loggers.add(name, {
      console: {
        colorize: true,
        label: name,
        level: process.env.LOG_LEVEL,
        silent: process.argv.includes('--silent')
      }
    });
    loggers[name] = true;
  }

  return winston.loggers.get(name);
};
