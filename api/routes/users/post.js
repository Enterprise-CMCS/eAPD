const bcrypt = require('bcryptjs');
const defaultUserModel = require('../../db/bookshelf').models.user;
const loggedIn = require('../../auth/middleware').loggedIn;

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

module.exports = (app, UserModel = defaultUserModel) => {
  app.post('/user', loggedIn, async (req, res) => {
    if (req.body.email && req.body.password) {
      try {
        if (await userIsNew(req.body.email, UserModel)) {
          await insert(req.body.email, req.body.password, UserModel);
          res.status(200).end();
        } else {
          res
            .status(400)
            .send({ error: 'add-user-email-exists' })
            .end();
        }
      } catch (e) {
        // 👆 eventually we should catch errors here and log
        // them somewhere.  For now... just eating them.
        res.status(500).end();
      }
    } else {
      res
        .status(400)
        .send({ error: 'add-user-invalid' })
        .end();
    }
  });
};
