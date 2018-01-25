const defaultUserModel = require('../../db/bookshelf').models.user;
const loggedIn = require('../../auth/middleware').loggedIn;

const allUsersHandler = async (req, res, UserModel) => {
  try {
    const users = await UserModel.fetchAll({ columns: ['id', 'email'] });
    res.send(users);
  } catch (e) {
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, UserModel) => {
  if (req.params.id && !Number.isNaN(Number(req.params.id))) {
    try {
      const user = await UserModel
        .where({ id: Number(req.params.id) })
        .fetch({ columns: ['id', 'email'] });
      if (user) {
        res.send(user);
      } else {
        res.status(404).end();
      }
    } catch (e) {
      res.status(500).end();
    }
  } else {
    res
      .status(400)
      .send({ error: 'get-user-invalid' })
      .end();
  }
};

module.exports = (app, UserModel = defaultUserModel) => {
  app.get('/users', loggedIn, (req, res) => allUsersHandler(req, res, UserModel));
  app.get('/user/:id', loggedIn, (req, res) => oneUserHandler(req, res, UserModel));
};
