module.exports = (username, password, done) => {
  // Check the username and password.  If it's good, callback
  // with a valid user object.
  if (username === 'hello' && password === 'world') {
    done(null, { username, email: 'hello@world.com', id: 'user-id' });
  } else {
    // Otherwise, callback with an error.
    done('Unknown user');
  }
};
