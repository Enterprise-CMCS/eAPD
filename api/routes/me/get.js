const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  logger.silly('setting up GET endpoint');
  app.get('/me', loggedIn, (req, res) => {
    // Get rid of the model object before sending
    // it back to the client.
    res.send({ ...req.user, model: undefined });
  });
};
