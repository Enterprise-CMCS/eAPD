const logger = require('../../logger')('users route post');
const bcrypt = require('bcryptjs');
const zxcvbn = require('zxcvbn');
const defaultUserModel = require('../../db').models.user;
const can = require('../../auth/middleware').can;

const userIsNew = async (email, UserModel) => {
  const user = await UserModel.where({ email }).fetch();

  if (user) {
    return false;
  }
  return true;
};

module.exports = (
  app,
  UserModel = defaultUserModel,
  passwordChecker = zxcvbn
) => {
  logger.silly('setting up PUT /user/:id route');
  // TODO [GW]: update authorization check here so users can edit themselves
  app.put('/user/:id', can('edit-users'), async (req, res) => {
    logger.silly(req, 'handling PUT /user/:id route');
    logger.silly(req, `attempting to update user [${req.params.id}]`);

    const user = await UserModel.where({ id: req.params.id }).fetch();
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

    try {
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
      return res.status(200).end();
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  });
};
