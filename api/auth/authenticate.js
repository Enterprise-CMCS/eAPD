const defaultDB = require('../db');
const defaultBcrypt = require('bcryptjs');

module.exports = (
  db = defaultDB,
  bcrypt = defaultBcrypt
) => ((username, password, done) => {
  if (username === 'hello' && password === 'world') {
    // Check the username and password.  If it's good, callback
    // with a valid user object.
    done(null, { username, email: 'hello@world.com', id: 'user-id' });
  } else {
    // Otherwise, callback with an error.
    done('Unknown user');
  }
});
