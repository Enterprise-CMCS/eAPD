// We're stuck on Winston 2.x because 3.x introduced some pretty major API
// changes. This hasn't seemed like a very high priority to update.

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
      // If console logging is not enabled, explicitly
      // silence it.  Otherwise it shows up anyway.
      transports.console = {
        silent: true
      };
    }

    winston.loggers.add(name, transports);
    loggers[name] = true;
  }

  const logger = winston.loggers.get(name);

  // Add an audit log level at 0 priority, so it will always be logged
  // regardless of the configured logging level.
  logger.setLevels({ audit: 0, ...winston.config.npm.levels });
  winston.addColors({ audit: 'red' });

  // Override the log function to append request information
  // if it's provided
  logger.log = (level, req, ...args) => {
    let requestInfo = req;
    // TODO [GW]: See if we can duck-type the request object, so we don't
    // try to log EVERY object as a request
    if (req && typeof req !== 'string') {
      requestInfo = {
        requestID: req.id
      };
      if (req.user) {
        requestInfo.userID = req.user.id;
      }
    }
    winston.Logger.prototype.log.apply(logger, [level, ...args, requestInfo]);
  };

  return logger;
};
