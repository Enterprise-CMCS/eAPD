module.exports = (username, password, done) => {
  if (username === 'hello' && password === 'world') {
    done(null, { username, email: 'hello@world.com', id: 'user-id' });
  } else {
    done('Unknown user');
  }
};
