const logger = require('../../logger')('users route post');
const defaultUserModel = require('../../db').models.user;
const can = require('../../middleware').can;

module.exports = (app, UserModel = defaultUserModel) => {
  logger.silly('setting up PUT /users/:id route');
  // TODO [GW]: update authorization check here so users can edit themselves
  app.put('/users/:id', can('edit-users'), async (req, res) => {
    logger.silly(req, 'handling PUT /users/:id route');
    logger.silly(req, `attempting to update user [${req.params.id}]`);

    try {
      const user = await UserModel.where({ id: req.params.id }).fetch();

      if (!user) {
        logger.verbose(req, `no user found for [${req.params.id}]`);
        return res.status(404).end();
      }

      logger.silly(req, 'updating user fields');
      const fields = [
        'email',
        'password',
        'name',
        'position',
        'phone',
        'state_id'
      ];
      fields.forEach(field => {
        if (req.body[field]) {
          user.set({ [field]: req.body[field] });
        }
      });

      try {
        await user.validate();
      } catch (e) {
        logger.verbose('validation fail');
        return res
          .status(400)
          .send({ error: `edit-user-${e.message}` })
          .end();
      }

      await user.save();
      logger.silly(req, 'all done');
      return res.send(user);
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
