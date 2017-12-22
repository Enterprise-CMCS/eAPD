const defaultDB = require('../../db')();
const loggedIn = require('../../auth/middleware').loggedIn;

const ifUserIsNew = (email, res, db) =>
  db('users')
    .where({ email })
    .first()
    .then(user => {
      if (user) {
        res
          .status(400)
          .send({ error: 'add-user-email-exists' })
          .end();
        return Promise.reject();
      }
      return Promise.resolve();
    });

const insert = (email, password, db) => {
  const hashed = bcrypt.hashSync(password);
  return db('users').insert({ email, password: hashed });
};

module.exports = (app, db = defaultDB) => {
  app.get('/users', loggedIn, (req, res) => {
    res
      .status(400)
      .send({ error: 'add-user-invalid' })
      .end();
  });
};
