import loggerFactory from '../../../../logger/index.js';
import get from './get.js';
import post from './post.js';

const logger = loggerFactory('auth certifications route index');

export default (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  logger.debug('setting up state admin certifications files endpoints');
  getEndpoint(app);
  postEndpoint(app);
};
