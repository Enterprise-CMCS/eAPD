const logger = require('../../../logger')('apds/budget route index');
const patch = require('./patch');

module.exports = (app, { patchEndpoint = patch } = {}) => {
  logger.debug('setting up PATCH endpoint');
  patchEndpoint(app);
};
