const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  logger.debug('setting up GET endpoint');
  app.get('/me', loggedIn, (req, res) => {
    logger.info('getting /me');
    res.send(req.user);
  });
};
