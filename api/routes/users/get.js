const defaultDB = require('../../db')();
const loggedIn = require('../../auth/middleware').loggedIn;

module.exports = (app, db = defaultDB) => {
  app.get('/users', loggedIn, (req, res) => {
    db('users')
      .select('id', 'email')
      .then(users => {
        res.send(users);
      })
      .catch(() => {
        res.status(500).end();
      });
  });

  app.get('/user/:id', loggedIn, (req, res) => {
    if (req.params.id && !Number.isNaN(Number(req.params.id))) {
      db('users')
        .where({ id: Number(req.params.id) })
        .first('id', 'email')
        .then(user => {
          if (user) {
            res.send(user);
          } else {
            res.status(404).end();
          }
        })
        .catch(() => {
          res.status(500).end();
        });
    } else {
      res
        .status(400)
        .send('get-user-invalid')
        .end();
    }
  });
};
