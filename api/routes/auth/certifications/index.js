const logger = require('../../../logger')('auth certifications route index');
const post = require('./post');

module.exports = (app, postEndpoint = post) => {
  logger.debug('setting up POST endpoint');
  postEndpoint(app);
};
