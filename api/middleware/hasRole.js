const logger = require('../logger')('hasRole middleware');

/**
 * @description Middleware to check if the authenticated user has a particular
 * role. Returns '403 Verboden' status and breaks the middleware function
 * chain if the user does not have the provided role.
 *
 * @param {string} role The role name to check
 * @returns {function} middleware function
 */
const hasRole = role => (request, response, next) => {
  const { user = {} } = request;
  const { roles = [] } = user;
  logger.debug({ id: request.id, roles, role });
  if (!roles.includes(role)) {
    logger.debug({ id: request.id, message: `user does not have role ${role}`});
    response.status(403).end();
  }
  logger.debug({ id: request.id, message: `user has role ${role}`});
  next();
};

module.exports = hasRole
