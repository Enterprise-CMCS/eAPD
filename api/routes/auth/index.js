const logger = require('../../logger')('auth route index');
const activities = require('./activities');
const roles = require('./roles');
const certifications = require('./certifications');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles,
  certificationsEndpoint = certifications
) => {
  logger.debug('setting up auth activities endpoints');
  activitiesEndpoint(app);
  logger.debug('setting up auth roles endpoints');
  rolesEndpoint(app);
  logger.debug('setting up auth certifications endpoints');
  certificationsEndpoint(app);
};
