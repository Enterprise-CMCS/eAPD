const logger = require('../../../logger')('auth certifications route index');
const files = require('./files');
const post = require('./post');

const get = require('./get')


module.exports = (app, 
  { filesEndpoint = files, postEndpoint = post, getEndpoint = get } = {}
) => {
  logger.debug('setting up state admin certifications endpoint');
  filesEndpoint(app);
  postEndpoint(app);
  getEndpoint(app)
};
