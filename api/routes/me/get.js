const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  logger.debug('setting up GET endpoint');
  app.get('/me', loggedIn, async (req, res) => {
    res.send(req.user);
  });
};
