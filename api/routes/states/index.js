import loggerFactory from '../../logger/index.js';
import get from './get.js';
import affiliations from './affilitations/index.js';

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
