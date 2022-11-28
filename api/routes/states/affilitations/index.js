import loggerFactory from '../../../logger';
import get from './get';
import post from './post';
import patch from './patch';

const logger = loggerFactory('affiliation route index');

export default (
  app,
  { getEndpoint = get, postEndpoint = post, patchEndpoint = patch } = {}
) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
  logger.debug('setting up patch endpoint');
  patchEndpoint(app);
};
