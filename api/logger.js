const winston = require('winston');

const loggers = {};

module.exports = name => {
  if (!loggers[name]) {
    const transports = {};

    if (process.env.LOG_FILE === 'true') {
      transports.file = {
        filename: 'hitech_api.log',
        label: name,
        level: process.env.LOG_LEVEL,
        maxFiles: 5,
        maxsize: 2097152,
        tailable: true,
        timestamp: true,
        zippedArchive: true
      };
    }

    if (process.env.LOG_CONSOLE === 'true') {
      transports.console = {
        colorize: true,
        label: name,
        level: process.env.LOG_LEVEL,
        prettyPrint: true,
        silent: process.argv.includes('--silent'),
        timestamp: true
      };
    } else {
      transports.console = {
        silent: true
      };
    }

    winston.loggers.add(name, transports);
    loggers[name] = true;
  }

  const logger = winston.loggers.get(name);
  logger.log = (level, req, ...args) => {
    let middleBit = req;
    if (req && typeof req !== 'string') {
      middleBit = {
        requestID: req.id
      };
      if (req.user) {
        middleBit.userID = req.user.id;
      }
    }
    winston.Logger.prototype.log.apply(logger, [level, ...args, middleBit]);
  };

  return logger;
};
