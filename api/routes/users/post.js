const logger = require('../../logger')('users route post');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

module.exports = (app, UserModel = defaultUserModel) => {
  logger.silly('setting up POST /users route');
  app.post('/users', can('add-users'), async (req, res) => {
    logger.silly(req, 'handling POST /users route');
    logger.silly(req, `attempting to create new user [${req.body.email}]`);
    if (req.body.email && req.body.password) {
      try {
        const user = UserModel.forge({
          email: req.body.email,
          password: req.body.password
        });

        try {
          await user.validate();
        } catch (e) {
          logger.verbose('validation fail');
          return res
            .status(400)
            .send({ error: `add-user-${e.message}` })
            .end();
        }

        await user.save();
        logger.silly(req, 'all done');
        return res.status(200).end();
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    } else {
      logger.verbose(
        req,
        `invalid request - ${req.body.email ? 'password' : 'email'} missing`
      );
      return res
        .status(400)
        .send({ error: 'add-user-invalid' })
        .end();
    }
  });
};
