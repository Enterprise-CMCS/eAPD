const defaultDB = require('../db')();

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = (user, done) => {
  done(null, user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = (userID, done, db = defaultDB) =>
  db('users')
    .where({ id: userID })
    .select()
    .then(users => {
      if (users.length) {
        done(null, { username: users[0].email, id: users[0].id });
      } else {
        done('Could not deserialize user');
      }
    });
