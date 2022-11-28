import loggerFactory from '../../logger';
import get from './get';
import affiliations from './affilitations/index';

const logger = loggerFactory('state route index');

export default (
  app,
  { getEndpoint = get, affiliationEndpoints = affiliations } = {}
) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);

  logger.debug('setting up State Affiliation endpoints');
  affiliationEndpoints(app);
};
