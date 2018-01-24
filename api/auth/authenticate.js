const defaultDB = require('../db')();
const defaultBcrypt = require('bcryptjs');

module.exports = (db = defaultDB, bcrypt = defaultBcrypt) => async (
  username,
  password,
  done
) => {
  try {
    const user = await db('users')
      .where({ email: username })
      .first();
    // If there is a matching user, return it
    if (user && bcrypt.compareSync(password, user.password)) {
      done(null, { username: user.email, id: user.id });
    } else {
      // Otherwise, callback with a false user.  If we
      // send an error, Passport will send a status 500,
      // but if we send no error and a false user, it will
      // send a 401, which is what we really want.  So...
      // I guess a failed login isn't an error. :P
      done(null, false);
    }
  } catch (e) {
    done('Database error');
  }
};
