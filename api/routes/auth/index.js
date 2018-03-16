const logger = require('../../logger')('auth route index');
const activities = require('./activities');
const roles = require('./roles');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles
) => {
  logger.silly('setting up auth activities endpoints');
  activitiesEndpoint(app);
  logger.silly('setting up auth roles endpoints');
  rolesEndpoint(app);
};
