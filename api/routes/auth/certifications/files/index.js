const logger = require('../../../../logger')('auth certifications route index');
const get = require('./get');
const post = require('./post');

module.exports = (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  logger.debug('setting up state admin certifications files endpoints');
  getEndpoint(app);
  postEndpoint(app);
};
