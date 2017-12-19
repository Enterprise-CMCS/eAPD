const defaultDB = require('../db')();
const defaultBcrypt = require('bcryptjs');

module.exports = (
  db = defaultDB,
  bcrypt = defaultBcrypt
) => ((username, password, done) => db('users')
  .where({
    email: username
  })
  .select()
  .then((users) => {
    let user = { password: '' };
    if (users.length) {
      user = users[0];
    }

    // If there is a matching user, return it
    if (bcrypt.compareSync(password, user.password)) {
      done(null, { username: user.email, id: user.id });
    } else {
      // Otherwise, callback with an error.
      done('Unknown user');
    }
  })
  .catch(() => {
    done('Database error');
  })
);
