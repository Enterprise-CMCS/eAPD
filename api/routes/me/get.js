const logger = require('../../logger')('me route get');

module.exports = app => {
  const loggedIn = require('../../middleware').loggedIn;
  logger.silly('setting up GET endpoint');
  app.get('/me', loggedIn, async (req, res) => {
    res.send(req.user);
  });
};
