const logger = require('../logger')('errorHandler middleware')

// https://stackoverflow.com/a/33526438/2675670
const errorHandler = (err, req, res, next) => {
  logger.error({ id: req.id, message: err });
  if (res.headersSent) { return next(err); }
  return res.status(500).end();
};

module.exports = errorHandler;
