const logger = require('../logger')('errorHandler middleware');
const { ERRORS, CODES } = require('../util/errorCodes');

/**
 * Error-handler Middleware
 *   - logs the error
 *   - passes error to express via `next`, if error occurs while streaming
 *   - sends error.status or 500 HTTP status code
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
  console.log({ err });
  let status = err.status || 400;
  let message =
    err.message || (typeof err === 'string' ? err : CODES[status.toString()]);

  // if (message.match(/getaddrinfo ENOTFOUND db/i)) {
  //   console.log('getaddrinfo ENOTFOUND db');
  //   status = 500;
  //   message = CODES['500'];
  // }

  logger.error({ id: req.id, message });
  if (res.headersSent) {
    return next(err);
  }

  return res
    .status(status)
    .send(message)
    .end();
};

module.exports = errorHandler;
