const defaultDB = require('../../db')();
const loggedIn = require('../../auth/middleware').loggedIn;

const allUsersHandler = async (req, res, db) => {
  try {
    const users = await db('users')
      .select('id', 'email');
    res.send(users);
  } catch (e) {
    res.status(500).end();
  }
};

const oneUserHandler = async (req, res, db) => {
  if (req.params.id && !Number.isNaN(Number(req.params.id))) {
    try {
      const user = await db('users')
        .where({ id: Number(req.params.id) })
        .first('id', 'email');
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

module.exports = (app, db = defaultDB) => {
  app.get('/users', loggedIn, (req, res) => allUsersHandler(req, res, db));
  app.get('/user/:id', loggedIn, (req, res) => oneUserHandler(req, res, db));
};
