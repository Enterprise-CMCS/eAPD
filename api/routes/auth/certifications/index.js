const logger = require('../../../logger')('auth certifications route index');
const matches = require('./matches')

module.exports = (app,
                  { matchesEndpoint = matches } = {}
) => {
  logger.debug('setting up state admin certifications endpoint');
  matchesEndpoint(app);
};
