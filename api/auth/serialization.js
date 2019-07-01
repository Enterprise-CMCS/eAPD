const logger = require('../logger')('user serialization');
const defaultUserModel = require('../db').models.user;

const { addUserSession, getUserIDFromSession } = require('./sessionStore');

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = async (
  user,
  done,
  { sessionStore: { addSession = addUserSession } = {} } = {}
) => {
  logger.silly(`serializing a user with id ${user.id}`);
  const sessionID = await addSession(user.id);
  logger.silly(`session ID = ${sessionID}`);
  done(null, sessionID);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = async (
  sessionID,
  done,
  {
    sessionStore: { getUserID = getUserIDFromSession } = {},
    userModel = defaultUserModel
  } = {}
) => {
  try {
    logger.silly(`attempting to deserialize a user, session = ${sessionID}`);

    const userID = await getUserID(sessionID);
    if (userID) {
      const user = await userModel
        .where({ id: userID })
        .fetch({ withRelated: ['state'] });
      if (user) {
        logger.silly(`successfully deserialized the user`);
        done(null, {
          username: user.get('email'),
          id: user.get('id'),
          name: user.get('name'),
          phone: user.get('phone'),
          position: user.get('position'),
          role: user.get('auth_role'),
          state: user.get('state_id'),
          activities: await user.activities(),
          model: user
        });
      } else {
        logger.verbose(`could not deserialize user`, userID);
        done(null, null);
      }
    } else {
      logger.warn(`${sessionID} does not map to a user ID`);
      done(null, null);
    }
  } catch (e) {
    logger.error(null, e);
    done('Could not deserialize user');
  }
};
