const logger = require('../../logger')('me route get');
const loggedIn = require('../../auth/middleware').loggedIn;

module.exports = app => {
  logger.silly('setting up GET endpoint');
  app.get('/me', loggedIn, (req, res) => {
    res.send(req.user);
  });
};
