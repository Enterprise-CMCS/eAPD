const logger = require('../../logger')('me route get');
const loggedIn = require('../../middleware').loggedIn;
const { deserializeUser } = require('../../auth/serialization');
const { knex } = require('../../db');

module.exports = (app, { db = knex, deserialize = deserializeUser } = {}) => {
  logger.silly('setting up GET endpoint');
  app.get(
    '/me',
    loggedIn,
    async (req, res) =>
      new Promise(resolve => {
        // Send back state info and get rid of the model object
        // before sending it back to the client.
        // The GET /me method relies on the data from the deserializer. Rather
        // than duplicate that logic, just call it.  Hooray x 2!
        deserialize(req.session.passport.user, async (err, user) => {
          if (err) {
            return resolve(res.status(500).end());
          }

          const state = await db('states')
            .where('id', user.state)
            .select('id', 'name')
            .first();

          return resolve(
            res.send({
              ...user,
              state
            })
          );
        });
      })
  );
};
