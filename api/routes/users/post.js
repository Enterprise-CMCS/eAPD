const logger = require('../../logger')('users route post');
const { createUser, validateUser } = require('../../db');
const can = require('../../middleware').can;
const auditor = require('../../audit');

module.exports = app => {
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

        ['name', 'position', 'phone'].forEach(field => {
          if (req.body[field]) {
            audit.set(field, req.body[field]);
            posted[field] = req.body[field];
          }
        });
        if (req.body.state) {
          posted.state_id = req.body.state;
        }
        if (req.body.role) {
          posted.auth_role = req.body.role;
        }

        try {
          await validateUser(posted);
        } catch (e) {
          logger.verbose('validation fail');
          return res
            .status(400)
            .send({ error: `add-account.${e.message}` })
            .end();
        }

        const userID = await createUser(posted);

        audit.set('id', userID[0]);
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
