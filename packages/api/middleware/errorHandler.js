const logger = require('../logger')('errorHandler middleware');

const ERROR_MESSAGES = {
  400: 'The server could not process the request',
  401: 'The user is not logged in',
  403: 'The user does not have permission to perform this activity',
  404: 'The server could not find the requested resource',
  415: 'The media type is not supported by the server',
  422: 'The server could not process the request as submitted',
  500: 'There was an error on the server'
};

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
    message = { error: ERROR_MESSAGES[status] };
  }

  if (message.error.match(/getaddrinfo ENOTFOUND db/i)) {
    status = 500;
    message = { error: ERROR_MESSAGES[500] };
  }

  if (message.error.match(/getaddrinfo ENOTFOUND mongo/i)) {
    status = 500;
    message = { error: ERROR_MESSAGES[500] };
  }

  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json(message).end();
};

module.exports = errorHandler;
