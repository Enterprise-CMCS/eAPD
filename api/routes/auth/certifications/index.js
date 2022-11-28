import loggerFactory from '../../../logger';
import files from './files';
import post from './post';
import put from './put';
import get from './get';
import del from './delete';

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
