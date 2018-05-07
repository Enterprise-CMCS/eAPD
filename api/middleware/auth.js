const logger = require('../logger')('auth middleware');
const { cache } = require('./cache');

/**
 * @description Middleware to check if the current request is
 * authenticated.  Returns a 403 and breaks the
 * process chain if the request is not authenticated.
 */
const loggedIn = (req, res, next) => {
  logger.silly(req, 'got a loggedIn middleware request');
  if (req.user) {
    logger.verbose(req, `user is logged in`);
    next();
  } else {
    logger.info(req, 'user is not logged in');
    res.status(403).end();
  }
};

module.exports.loggedIn = loggedIn;

/**
 * @description Middleware to check if the authenticated user
 * has a particular activity permission. Returns
 * a 401 and breaks the process chain if the
 * user is not authorized.
 *
 * @param {string} activity The activity permission to check for
 * @returns {function} The middleware function
 */
module.exports.can = activity =>
  cache(['can', activity], () => {
    const can = (req, res, next) => {
      logger.silly(req, `got a can middleware request for [${activity}]`);
      // First check if they're logged in
      module.exports.loggedIn(req, res, () => {
        // Then check if they have the activity
        if (req.user.activities.includes(activity)) {
          logger.verbose(req, `user has the [${activity}] activity`);
          next();
        } else {
          logger.info(req, `user does not have the [${activity}] activity`);
          res.status(401).end();
        }
      });
    };
    return can;
  });
