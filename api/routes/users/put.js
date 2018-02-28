const logger = require('../../logger')('users route post');
const bcrypt = require('bcryptjs');
const zxcvbn = require('zxcvbn');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

const userIsNew = async (email, UserModel) => {
  const user = await UserModel.where({ email }).fetch();
  return user ? false : true;
};

// TODO: figure out better/cleaner solution.
// At the very least, move this helper to a better location
const toObj = entry => JSON.parse(JSON.stringify(entry));

module.exports = (
  app,
  UserModel = defaultUserModel,
  passwordChecker = zxcvbn
) => {
  logger.silly('setting up PUT /users/:id route');
  // TODO [GW]: update authorization check here so users can edit themselves
  app.put('/users/:id', can('edit-users'), async (req, res) => {
    logger.silly(req, 'handling PUT /users/:id route');
    logger.silly(req, `attempting to update user [${req.params.id}]`);

    try {
      const user = await UserModel.where({ id: req.params.id }).fetch({
        columns: ['id', 'email', 'name', 'position', 'phone', 'state']
      });

      if (!user) {
        logger.verbose(req, `no user found for [${req.params.id}]`);
        return res.status(404).end();
      }

      if (req.body.email && req.body.email !== user.get('email')) {
        if (!await userIsNew(req.body.email, UserModel)) {
          logger.verbose(
            req,
            `user with email already exists [${req.body.email}]`
          );
          return res
            .status(400)
            .send({ error: 'edit-user-email-exists' })
            .end();
        }
      }

      if (req.body.password) {
        const passwordScore = passwordChecker(req.body.password, [
          req.body.email
        ]);

        if (passwordScore.score < 3) {
          logger.verbose(`password is too weak: score ${passwordScore.score}`);
          return res
            .status(400)
            .send({ error: 'edit-user-weak-password' })
            .end();
        }

        user.set({ password: bcrypt.hashSync(req.body.password) });
      }

      logger.silly(req, 'updating user fields');
      const fields = ['email', 'name', 'position', 'phone', 'state'];
      fields.forEach(field => {
        if (req.body[field]) {
          user.set({ [field]: req.body[field] });
        }
      });

      // TODO Need more validation - phone and state have restrictions
      // Remove non-numeric characters from phone numbers, too

      await user.save();
      logger.silly(req, 'all done');
      return res.send(toObj(user));
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
