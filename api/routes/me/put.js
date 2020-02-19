const auditor = require('../../audit');
const {
  getUserByID: gu,
  updateUser: uu,
  validateUser: vu
} = require('../../db');
const logger = require('../../logger')('me route put');
const loggedIn = require('../../middleware').loggedIn;

const editableFields = ['name', 'password', 'phone', 'position'];

module.exports = (
  app,
  { getUserByID = gu, updateUser = uu, validateUser = vu } = {}
) => {
  logger.silly('setting up PUT endpoint');
  app.put('/me', loggedIn, async (req, res) => {
    const audit = auditor(auditor.actions.MODIFY_ACCOUNT, req);
    try {
      // If the body doesn't include any editable fields, we
      // can bail out now.  Hooray!
      if (!editableFields.some(f => req.body[f])) {
        res.send(req.user);
        return;
      }

      audit.target({ id: req.user.id, email: req.user.email });

      const update = {};

      editableFields.forEach(f => {
        if (req.body[f]) {
          audit.set(f, req.body[f]);
          update[f] = req.body[f];
        }
      });

      try {
        await validateUser(update);
      } catch (e) {
        res
          .status(400)
          .send({ error: `edit-self.${e.message}` })
          .end();
        return;
      }

      await updateUser(req.user.id, update);
      audit.log();

      const user = await getUserByID(req.user.id);
      res.send(user);
    } catch (e) {
      logger.error('error');
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
