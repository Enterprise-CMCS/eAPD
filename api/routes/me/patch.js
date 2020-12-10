const { raw: knex } = require('../../db');
const { getStateById } = require('../../db/states');
const logger = require('../../logger')('me patch route');
const loggedIn = require('../../middleware').loggedIn;

module.exports = app => {
  app.patch('/me', loggedIn, async (req, res) => {
    const { stateId } = req.body;
    logger.info({ id: req.id, message: { stateId } });

    await getStateById(stateId)
      .then(state => {
        if (state) {
          return state;
        }
        throw new Error('Not found');
      })
      .then(state =>
        knex('users')
          .insert({
            uid: req.user.id,
            state_id: state.id
          })
          .onConflict('uid')
          .merge()
          .then(() => res.status(200).end())
      )
      .catch(() => res.status(400).end());
  });
};
