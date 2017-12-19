const defaultDB = require('../db')();
const defaultBcrypt = require('bcryptjs');

module.exports = (
  db = defaultDB,
  bcrypt = defaultBcrypt
) => ((username, password, done) => {
  const pwHash = bcrypt.hashSync(password);
  return db('users')
    .where({
      email: username,
      password: pwHash
    })
    .select()
    .then((u) => {
      if (u.length) {
        // If there is a matching user, return it
        done(null, { username: u[0].email, id: u[0].id });
      } else {
        // Otherwise, callback with an error.
        done('Unknown user');
      }
    })
    .catch(() => {
      done('Database error');
    });
});
