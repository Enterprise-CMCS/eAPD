import loggerFactory from '../../logger/index.js';
import del from './delete.js';
import get from './get.js';
import patch from './patch.js';
import post from './post.js';
import files from './files/index.js';
import events from './events/index.js';
import submissions from './submissions/index.js';

const logger = loggerFactory('apds route index');

export default (
  app,
  {
    filesEndpoints = files,
    eventsEndpoints = events,
    deleteEndpoint = del,
    getEndpoint = get,
    patchEndpoint = patch,
    postEndpoint = post,
    submissionsEndpoints = submissions
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

  logger.debug('setting up APD submissions endpoints');
  submissionsEndpoints(app);
};
