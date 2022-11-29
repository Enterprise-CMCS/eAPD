import loggerFactory from '../../../logger/index.js';
import get from './get.js';
import post from './post.js';
import patch from './patch.js';

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
