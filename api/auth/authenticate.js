const defaultBcrypt = require('bcryptjs');
const defaultUserModel = require('../db').models.user;

module.exports = (
  userModel = defaultUserModel,
  bcrypt = defaultBcrypt
) => async (username, password, done) => {
  try {
    const user = await userModel.where({ email: username }).fetch();

    if (user && (await bcrypt.compare(password, user.get('password')))) {
      done(null, {
        username: user.get('email'),
        id: user.get('id')
      });
    } else {
      done(null, false);
    }
  } catch (e) {
    done('Database error');
  }
};
