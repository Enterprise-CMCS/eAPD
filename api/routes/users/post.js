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

const insert = async (email, password, UserModel) => {
  const hashed = bcrypt.hashSync(password);
  const user = new UserModel({ email, password: hashed });
  await user.save();
};

module.exports = (
  app,
  UserModel = defaultUserModel,
  passwordChecker = zxcvbn
) => {
  logger.silly('setting up POST /user route');
  app.post('/user', can('add-users'), async (req, res) => {
    logger.silly(req, 'handling POST /user route');
    logger.silly(req, `attempting to create new user [${req.body.email}]`);
    if (req.body.email && req.body.password) {
      try {
        if (!await userIsNew(req.body.email, UserModel)) {
          logger.verbose(
            req,
            `user with email already exists [${req.body.email}]`
          );
          return res
            .status(400)
            .send({ error: 'add-user-email-exists' })
            .end();
        }

        logger.silly(req, 'email address is unique - adding user');
        const passwordScore = passwordChecker(req.body.password, [
          req.body.email
        ]);

        if (passwordScore.score < 3) {
          logger.verbose(`password is too weak: score ${passwordScore.score}`);
          return res
            .status(400)
            .send({ error: 'add-user-weak-password' })
            .end();
        }

        await insert(req.body.email, req.body.password, UserModel);
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
