import loggerFactory from '../../../logger';
import get from './get';

const logger = loggerFactory('auth roles route index');

export default (app, getEndpoint = get) => {
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
};
