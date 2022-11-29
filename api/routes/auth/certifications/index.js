import loggerFactory from '../../../logger/index.js';
import files from './files/index.js';
import post from './post.js';
import put from './put.js';
import get from './get.js';
import del from './delete.js';

const logger = loggerFactory('auth certifications route index');

export default (
  app,
  {
    filesEndpoint = files,
    postEndpoint = post,
    putEndpoint = put,
    getEndpoint = get,
    deleteEndpoint = del
  } = {}
) => {
  logger.debug('setting up state admin certifications endpoint');
  filesEndpoint(app);
  postEndpoint(app);
  putEndpoint(app);
  getEndpoint(app);
  deleteEndpoint(app);
};
