let db = null;

module.exports.setup = (database) => {
  db = database;
};

module.exports.authenticate = (username, password, done) => {
  if (!db) {
    done('No database');
  } else if (username === 'hello' && password === 'world') {
    // Check the username and password.  If it's good, callback
    // with a valid user object.
    done(null, { username, email: 'hello@world.com', id: 'user-id' });
  } else {
    // Otherwise, callback with an error.
    done('Unknown user');
  }
};
