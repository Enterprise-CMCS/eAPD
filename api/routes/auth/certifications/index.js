const logger = require('../../../logger')('auth certifications route index');
const files = require('./files');

module.exports = (app, filesEndpoint = files) => {
  logger.debug('setting up state admin certifications endpoint');
  filesEndpoint(app);
};
