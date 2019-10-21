const defaultZxcvbn = require('zxcvbn');
const validate = require('./validate');
const defaultHash = require('../../auth/passwordHash');
const logger = require('../../logger')('users route post');
const { knex } = require('../../db');
const can = require('../../middleware').can;
const auditor = require('../../audit');

module.exports = (
  app,
  { db = knex, hash = defaultHash, zxcvbn = defaultZxcvbn } = {}
) => {
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
          // const otherUsersWithThisEmail = await db('users')
          //   .whereRaw('LOWER(email) = ?', [posted.email.toLowerCase()])
          //   .select();

          // if (otherUsersWithThisEmail.length) {
          //   logger.verbose(`user with email already exists [${posted.email}]`);
          //   throw new Error('email-exists');
          // }

          // logger.silly('new email is unique!');

          // const passwordScore = zxcvbn(posted.password, [
          //   posted.email,
          //   posted.name || ''
          // ]);
          // if (passwordScore.score < 3) {
          //   logger.verbose(
          //     `password is too weak: score ${passwordScore.score}`
          //   );
          //   throw new Error('weak-password');
          // }

          // logger.silly('password is sufficiently complex; hashing it');
          await validate(posted);
        } catch (e) {
          logger.verbose('validation fail');
          return res
            .status(400)
            .send({ error: `add-account.${e.message}` })
            .end();
        }

        posted.password = hash.hashSync(posted.password);

        const userID = await db('users')
          .insert(posted)
          .returning('id');

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
