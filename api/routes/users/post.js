const logger = require('../../logger')('users route post');
const defaultUserModel = require('../../db').models.user;
const can = require('../../middleware').can;
const auditor = require('../../audit');

module.exports = (app, UserModel = defaultUserModel) => {
  logger.silly('setting up POST /users route');
  app.post('/users', can('add-users'), async (req, res) => {
    logger.silly(req, 'handling POST /users route');
    logger.silly(req, `attempting to create new user [${req.body.email}]`);
    if (req.body.email && req.body.password) {
      try {
        const audit = auditor(auditor.actions.CREATE_ACCOUNT, req);

        const posted = {
          email: req.body.email,
          password: req.body.password
        };
        audit.set('email', req.body.email);
        audit.set('password', '<new password>');

        // If these values are not passed in, don't set them at all, even
        // to undefined.  Undefined will make the data model explode.
        if (req.body.name) {
          audit.set('name', req.body.name);
          posted.name = req.body.name;
        }
        if (req.body.role) {
          audit.set('auth_role', req.body.role);
          posted.auth_role = req.body.role;
        }
        if (req.body.state) {
          audit.set('state_id', req.body.state);
          posted.state_id = req.body.state;
        }

        const user = UserModel.forge(posted);

        try {
          await user.validate();
        } catch (e) {
          logger.verbose('validation fail');
          return res
            .status(400)
            .send({ error: `add-account.${e.message}` })
            .end();
        }

        await user.save();

        audit.set('id', user.get('id'));
        audit.log();

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
        .send({ error: 'add-account.invalid' })
        .end();
    }
  });
};
