import loggerFactory from '../../../../logger';
import get from './get';
import post from './post';

const logger = loggerFactory('auth certifications route index');

export default (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  logger.debug('setting up state admin certifications files endpoints');
  getEndpoint(app);
  postEndpoint(app);
};
