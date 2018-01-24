const bcrypt = require('bcryptjs');
const defaultDB = require('../../db')();
const loggedIn = require('../../auth/middleware').loggedIn;

const userIsNew = async (email, db) => {
  const user = await db('users')
    .where({ email })
    .first();

  if (user) {
    return false;
  }
  return true;
};

const insert = async (email, password, db) => {
  const hashed = bcrypt.hashSync(password);
  await db('users').insert({ email, password: hashed });
};

module.exports = (app, db = defaultDB) => {
  app.post('/user', loggedIn, async (req, res) => {
    if (req.body.email && req.body.password) {
      try {
        if (await userIsNew(req.body.email, db)) {
          await insert(req.body.email, req.body.password, db);
          res.status(200).end();
        } else {
          res.status(400).send({ error: 'add-user-email-exists' }).end();
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
