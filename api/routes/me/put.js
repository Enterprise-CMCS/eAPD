const defaultZxcvbn = require('zxcvbn');

const auditor = require('../../audit');
const defaultHash = require('../../auth/passwordHash');
const deserializeUser = require('../../auth/serialization').deserializeUser;
const { knex } = require('../../db');
const logger = require('../../logger')('me route put');
const loggedIn = require('../../middleware').loggedIn;

const editableFields = ['name', 'password', 'phone', 'position'];

const getUserJSON = async (user, db) => {
  const state = await db('states')
    .where('id', user.state)
    .select('id', 'name')
    .first();

  return {
    ...user,
    state
  };
};

module.exports = (
  app,
  {
    db = knex,
    deserialize = deserializeUser,
    hash = defaultHash,
    zxcvbn = defaultZxcvbn
  } = {}
) => {
  logger.silly('setting up PUT endpoint');
  app.put('/me', loggedIn, async (req, res) => {
    const audit = auditor(auditor.actions.MODIFY_ACCOUNT, req);
    try {
      // If the body doesn't include any editable fields, we
      // can bail out now.  Hooray!
      if (!editableFields.some(f => req.body[f])) {
        res.send(await getUserJSON(req.user, db));
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
        if (update.phone) {
          logger.silly('phone changed; verifying that it is just 10 digits');

          const phone = update.phone.replace(/[^\d]/g, '');
          if (phone.length > 10) {
            logger.verbose(`phone number is invalid [${update.phone}]`);
            throw new Error('invalid-phone');
          }

          logger.silly('phone is valid; updating to just numbmers');
          update.phone = phone;
        }
        if (update.password) {
          logger.silly('password changed; verifying complexity/strength');

          const passwordScore = zxcvbn(update.password, [
            req.user.email,
            update.name || req.user.name
          ]);
          if (passwordScore.score < 3) {
            logger.verbose(
              `password is too weak: score ${passwordScore.score}`
            );
            throw new Error('weak-password');
          }

          logger.silly('password is sufficiently complex; hashing it');
          update.password = hash.hashSync(update.password);
        }
      } catch (e) {
        res
          .status(400)
          .send({ error: `edit-self.${e.message}` })
          .end();
        return;
      }

      await db('users')
        .where('id', req.user.id)
        .update(update);
      audit.log();

      // The GET /me method relies on the data from the deserializer. Rather
      // than duplicate that logic, just call it.  Hooray x 2!
      deserialize(req.session.passport.user, async (err, user) => {
        if (err) {
          return res.status(500).end();
        }

        return res.send(await getUserJSON(user, db));
      });
    } catch (e) {
      logger.error('error');
      logger.error(req, e);
      res.status(500).end();
    }
  });
};
