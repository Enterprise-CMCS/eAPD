const logger = require('../logger')('auth middleware');
const { cache } = require('./cache');
const { ERROR_MESSAGES } = require('../routes/openAPI/helpers');

/**
 * @description Middleware to check if the current request is authenticated.
 * Returns '401 Unauthorized' status and breaks the process chain if request
 * is not authenticated.
 */
const loggedIn = (req, res, next) => {
  logger.debug({ id: req.id, message: 'got a loggedIn middleware request' });
  if (req.user) {
    logger.verbose({ id: req.id, message: `user is logged in` });
    next();
  } else {
    logger.info({ id: req.id, message: 'user is not logged in' });
    res
      .status(401)
      .send({ error: ERROR_MESSAGES[401] })
      .end();
  }
};

module.exports.loggedIn = loggedIn;

/**
 * @description Middleware to check if the authenticated user has a particular
 * activity permission. Returns '403 Forbidden' status and breaks the process
 * chain if the user is not authorized.
 *
 * @param {string} activity The activity permission to check for
 * @returns {function} The middleware function
 */
const can = activity =>
  cache(['can', activity], () => {
    return (req, res, next) => {
      logger.debug({
        id: req.id,
        message: `got a can middleware request for [${activity}]`
      });
      // First check if they're logged in
      module.exports.loggedIn(req, res, () => {
        // Then check if they have the activity
        if (req.user.activities.includes(activity)) {
          logger.verbose({
            id: req.id,
            message: `user has the [${activity}] activity`
          });
          next();
        } else {
          logger.info({
            id: req.id,
            message: `user does not have the [${activity}] activity`
          });
          res
            .status(403)
            .send({ error: ERROR_MESSAGES[403] })
            .end();
        }
      });
    };
  });

module.exports.can = can;
