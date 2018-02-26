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
  app.post('/user', can('add-users'), async (req, res) => {
    if (req.body.email && req.body.password) {
      try {
        if (!await userIsNew(req.body.email, UserModel)) {
          return res
            .status(400)
            .send({ error: 'add-user-email-exists' })
            .end();
        }

        const passwordScore = passwordChecker(req.body.password, [
          req.body.email
        ]);
        if (passwordScore.score < 3) {
          return res
            .status(400)
            .send({ error: 'add-user-weak-password' })
            .end();
        }

        await insert(req.body.email, req.body.password, UserModel);
        return res.status(200).end();
      } catch (e) {
        // 👆 eventually we should catch errors here and log
        // them somewhere.  For now... just eating them.
        return res.status(500).end();
      }
    } else {
      return res
        .status(400)
        .send({ error: 'add-user-invalid' })
        .end();
    }
  });
};
