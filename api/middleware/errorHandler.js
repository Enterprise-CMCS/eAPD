const logger = require('../logger')('errorHandler middleware')

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
  logger.error({ id: req.id, message: err });
  if (res.headersSent) { return next(err); }
  return res.status(err.status || 500).end();
};

module.exports = errorHandler;
