const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  logger.silly('setting up GET endpoint');
  app.get('/me', loggedIn, async (req, res) => {
    // Send back state info and get rid of the model object
    // before sending it back to the client.
    res.send({
      ...req.user,
      state: {
        id: req.user.model.related('state').get('id'),
        name: req.user.model.related('state').get('name')
      },
      model: undefined
    });
  });
};
