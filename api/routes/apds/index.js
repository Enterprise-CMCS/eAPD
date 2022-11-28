import loggerFactory from '../../logger';
import del from './delete';
import get from './get';
import patch from './patch';
import post from './post';
import files from './files/index';
import events from './events/index';

const logger = loggerFactory('apds route index');

export default (
  app,
  {
    filesEndpoints = files,
    eventsEndpoints = events,
    deleteEndpoint = del,
    getEndpoint = get,
    patchEndpoint = patch,
    postEndpoint = post
  } = {}
) => {
  logger.debug('setting up DELETE endpoint');
  deleteEndpoint(app);
  logger.debug('setting up GET endpoint');
  getEndpoint(app);
  logger.debug('setting up PATCH endpoint');
  patchEndpoint(app);
  logger.debug('setting up POST endpoint');
  postEndpoint(app);

  logger.debug('setting up APD image endpoints');
  filesEndpoints(app);

  logger.debug('setting up APD events endpoints');
  eventsEndpoints(app);
};
