const logger = require('../logger')('errorHandler middleware');
const { ERROR_MESSAGES } = require('../routes/openAPI/helpers');

/**
 * Error-handler Middleware
 *   - logs the error
 *   - passes error to express via `next`, if error occurs while streaming
 *   - sends error.status or 400 HTTP status code
 *   - closes connection
 *
 * Note: express routes are expected do one of the following:
 *   - `try {...} catch(e) { next(e) }`
 *   - `promise.then().catch(next)`
 *
 * References:
 *   https://stackoverflow.com/a/33526438/2675670
 *   https://expressjs.com/en/guide/error-handling.html
 *
 * @function
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  logger.error({ id: req.id, message: err });
  let status = err.status || 400;

  let message;
  if (typeof err === 'object') {
    if (err.message) {
      message = { error: err.message };
    } else if (err.error) {
      message = { error: err.error };
    } else {
      message = { error: err.toString() };
    }
  } else if (typeof err === 'string') {
    message = { error: err };
  } else {
    message = ERROR_MESSAGES[status];
  }
  console.log(message);
  logger.info(message);

  if (message.error.match(/getaddrinfo ENOTFOUND db/i)) {
    status = 500;
    message = ERROR_MESSAGES[500];
  }

  if (res.headersSent) {
    return next(err);
  }
  return res
    .status(status)
    .send(message)
    .end();
};

module.exports = errorHandler;
