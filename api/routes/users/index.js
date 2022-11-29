import loggerFactory from '../../logger/index.js';
import get from './get.js';

const logger = loggerFactory('users route index');

export default (app, { getEndpoint = get } = {}) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
};
