import loggerFactory from '../../logger';
import activities from './activities/index';
import roles from './roles/index';
import states from './states/index';
import certifications from './certifications/index';

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
