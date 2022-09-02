const logger = require('../../../logger')('auth certifications route index');
const files = require('./files');
const post = require('./post');
const put = require('./put');
const get = require('./get');
const del = require('./delete');

module.exports = (
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
