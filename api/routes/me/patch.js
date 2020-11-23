const logger = require('../../logger')('me patch route')
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  app.put('/me', loggedIn, (req, res) => {
    const { stateId } = req.params;
    logger.info({ id: req.id, message: stateId });
    knex('users')
      .insert({
        uid: req.user.id,
        state_id: stateId
      })
      .onConflict('uid')
      .merge()
      .then(() => res.status(200).end())
      .catch(next);
  });
};
