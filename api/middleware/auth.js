const logger = require('../logger')('auth middleware');
const { cache } = require('./cache');

/**
 * @description Middleware to check if the current request is authenticated.
 * Returns '401 Unauthorized' status and breaks the process chain if request
 * is not authenticated.
 */
const loggedIn = (req, res, next) => {
  logger.silly({ id: req.id, message: 'got a loggedIn middleware request' });
  if (req.user) {
    logger.verbose({ id: req.id, message: `user is logged in` });
    next();
  } else {
    logger.info({ id: req.id, message: 'user is not logged in' });
    res.status(401).end();
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
module.exports.can = (activity) =>
  cache(['can', activity], () => {
    const can = (req, res, next) => {
      logger.silly({ id: req.id, message: `got a can middleware request for [${activity}]` });
      loggedIn(req, res, () => {
        logger.info({ id: req.id, params: req.params })
        const stateId = req.params.stateId || (req.meta.apd && req.meta.apd.state);
        const { user } = req;
        const permissions = user.permissions[stateId] || [];
        logger.info({ id: req.id, message: `${stateId}: ${permissions}` })
        if (permissions.includes(activity)) {
          logger.verbose({ id: req.id, message: `user has the [${activity}] activity` });
          next();
        } else {
          logger.info({ id: req.id, message: `user does not have the [${activity}] activity` });
          res.status(403).end();
        }
      });
    };
    return can;
  });
