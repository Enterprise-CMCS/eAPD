const logger = require('../../logger')('auth route index');
const activities = require('./activities');
const roles = require('./roles');
const states = require('./states');
const certifications = require('./certifications');

module.exports = (
  app,
  activitiesEndpoint = activities,
  rolesEndpoint = roles,
  statesEndpoint = states,
  certificationsEndpoint = certifications
) => {
  logger.debug('setting up auth activities endpoints');
  activitiesEndpoint(app);
  logger.debug('setting up auth roles endpoints');
  rolesEndpoint(app);
  logger.debug('setting up auth states endpoints');
  statesEndpoint(app);
  logger.debug('setting up auth certifications endpoints');
  certificationsEndpoint(app);
};
