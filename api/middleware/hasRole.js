const logger = require('../logger')('hasRole middleware');

/**
 * @description Middleware to check if the authenticated user has a particular
 * role. Returns '400 Bad Request' status and breaks the middleware function
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
    response.status(400).end();
  }
  next();
};

module.exports = hasRole
