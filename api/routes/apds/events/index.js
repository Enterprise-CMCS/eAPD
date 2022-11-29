import loggerFactory from '../../../logger/index.js';
import post from './post.js';

const logger = loggerFactory('apds/events route index');

export default (app, { postEndpoint = post } = {}) => {
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
};
