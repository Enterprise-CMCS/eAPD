const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;
const { createOrUpdateOktaUserFromOkta } = require('../../db/oktaUsers')

module.exports = (
    app,
    {
      updateFromOkta = createOrUpdateOktaUserFromOkta
    } = {}

  ) => {
  logger.debug('setting up GET endpoint');
  app.get('/me', loggedIn, async (req, res) => {
    await updateFromOkta(req.user.id)
    res.send(req.user);
  });
};
