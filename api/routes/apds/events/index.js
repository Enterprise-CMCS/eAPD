import loggerFactory from '../../../logger';
import post from './post';

const logger = loggerFactory('apds/events route index');

export default (app, { postEndpoint = post } = {}) => {
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
};
