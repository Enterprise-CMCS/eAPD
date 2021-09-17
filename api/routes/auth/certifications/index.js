const logger = require('../../../logger')('auth certifications route index');
const files = require('./files');
const post = require('./post');

module.exports = (app, 
  { filesEndpoint = files, postEndpoint = post } = {}
) => {
  logger.debug('setting up state admin certifications endpoint');
  filesEndpoint(app);
  postEndpoint(app);
};
