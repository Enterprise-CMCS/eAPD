const logger = require('../logger')('authentication');
const defaultBcrypt = require('bcryptjs');
const defaultUserModel = require('../db').models.user;

module.exports = (
  userModel = defaultUserModel,
  bcrypt = defaultBcrypt
) => async (username, password, done) => {
  try {
    logger.verbose(`got authentication request for [${username}]`);

    const user = await userModel
      .query('whereRaw', 'LOWER(email) = ?', [username.toLowerCase()])
      .fetch();

    if (user && (await bcrypt.compare(password, user.get('password')))) {
      logger.verbose(`authenticated user [${username}]`);
      done(null, {
        username: user.get('email'),
        id: user.get('id')
      });
    } else {
      logger.verbose(`no user found or password mismatch for [${username}]`);
      done(null, false);
    }
  } catch (e) {
    logger.error(e);
    console.log(e);
    done('Database error');
  }
};
