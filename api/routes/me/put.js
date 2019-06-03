const logger = require('../../logger')('me route put');
const loggedIn = require('../../middleware').loggedIn;
const deserializeUser = require('../../auth/serialization').deserializeUser;
const auditor = require('../../audit');

const editableFields = ['name', 'password', 'phone', 'position'];

const getUserJSON = user => ({
  // Send back state info and get rid of the model object
  // before sending it back to the client.
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
    const audit = auditor(auditor.actions.MODIFY_ACCOUNT, req);
    try {
      // If the body doesn't include any editable fields, we
      // can bail out now.  Hooray!
      if (!editableFields.some(f => req.body[f])) {
        res.send(getUserJSON(req.user));
        return;
      }

      const dbUser = req.user.model;
      audit.target({ id: dbUser.get('id'), email: dbUser.get('email') });

      editableFields.forEach(f => {
        if (req.body[f]) {
          audit.set(f, req.body[f]);
          dbUser.set(f, req.body[f]);
        }
      });

      try {
        await dbUser.validate();
      } catch (e) {
        res
          .status(400)
          .send({ error: `edit-self.${e.message}` })
          .end();
        return;
      }

      await dbUser.save();
      audit.log();

      // The GET /me method relies on the data from the deserializer. Rather
      // than duplicate that logic, just call it.  Hooray x 2!
      deserialize(req.session.passport.user, (err, user) => {
        if (err) {
          return res.status(500).end();
        }

        return res.send(getUserJSON(user));
      });
    } catch (e) {
      logger.error('error');
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
