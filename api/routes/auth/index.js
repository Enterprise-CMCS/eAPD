import loggerFactory from '../../logger/index.js';
import activities from './activities/index.js';
import roles from './roles/index.js';
import states from './states/index.js';
import certifications from './certifications/index.js';

const logger = loggerFactory('auth route index');

export default (
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
