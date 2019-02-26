const logger = require('../../logger')('me route put');
const loggedIn = require('../../middleware').loggedIn;
const deserializeUser = require('../../auth/serialization').deserializeUser;

const editableFields = ['email', 'name', 'password', 'phone', 'position'];

const getUserJSON = user => ({
  ...user,
  state: {
    id: user.model.related('state').get('id'),
    name: user.model.related('state').get('name')
  },
  model: undefined
});

module.exports = (app, { deserialize = deserializeUser } = {}) => {
  logger.silly('setting up PUT endpoint');
  app.put('/me', loggedIn, async (req, res) => {
    try {
      if (!editableFields.some(f => req.body[f])) {
        // Send back state info and get rid of the model object
        // before sending it back to the client.
        res.send(getUserJSON(req.user));
        return;
      }

      const dbUser = req.user.model;

      editableFields.forEach(f => {
        if (req.body[f]) {
          dbUser.set(f, req.body[f]);
        }
      });

      try {
        await dbUser.validate();
      } catch (e) {
        res
          .status(400)
          .send({ error: `update-self-${e.message}` })
          .end();
        return;
      }

      await dbUser.save();

      deserialize(req.user.id, (err, user) => {
        if (err) {
          return res.status(500).end();
        }

        // Send back state info and get rid of the model object
        // before sending it back to the client.
        return res.send(getUserJSON(user));
      });
    } catch (e) {
      logger.error('error');
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
