const logger = require('../logger')('user serialization');
const defaultUserModel = require('../db').models.user;

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = (user, done) => {
  logger.silly(`serialized a user`, user);
  done(null, user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = async (
  userID,
  done,
  userModel = defaultUserModel
) => {
  try {
    logger.silly(`attempting to deserialize a user`, userID);
    const user = await userModel.where({ id: userID }).fetch();
    if (user) {
      logger.silly(`successfully deserialized the user`);
      done(null, {
        username: user.get('email'),
        id: user.get('id'),
        role: user.get('auth_role'),
        state: user.get('state_id'),
        activities: await user.activities(),
        model: user
      });
    } else {
      logger.verbose(`could not deserialize user`, userID);
      done(null, null);
    }
  } catch (e) {
    logger.error(e);
    done('Could not deserialize user');
  }
};
