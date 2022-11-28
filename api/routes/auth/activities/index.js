import loggerFactory from '../../../logger';
import get from './get';

const logger = loggerFactory('auth activities route index');

export default (app, getEndpoint = get) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
};
