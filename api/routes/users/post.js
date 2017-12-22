const bcrypt = require('bcryptjs');
const db = require('../../db')();
const loggedIn = require('../../auth/middleware').loggedIn;

const ifUserIsNew = (email, res) => db('users')
  .where({ email }).first()
  .then((user) => {
    if (user) {
      res.status(400).send({ error: 'add-user-email-exists' }).end();
      return Promise.reject();
    }
    return Promise.resolve();
  });

const insert = (email, password) => {
  const hashed = bcrypt.hashSync(password);
  return db('users').insert({ email, password: hashed });
};

module.exports = (app) => {
  app.post('/user', loggedIn, (req, res) => {
    if (req.body.email && req.body.password) {
      ifUserIsNew(req.body.email, res)
        .then(() => insert(req.body.email, req.body.password))
        .then(() => {
          res.status(200).end();
        })
        .catch(() => {
          // 👆 eventually we should catch errors here and log
          // them somewhere.  For now... just eating them.
          res.status(500).end();
        });
    } else {
      res.status(400).send({ error: 'add-user-invalid' }).end();
    }
  });
};
