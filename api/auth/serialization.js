// Passport.js user serialization methods.

const logger = require('../logger')('user serialization');
const { getUserByID: gu } = require('../db');

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

// Deserialize a session from the user's JWT into a user object.
module.exports.deserializeUser = async (
  { payload: sessionID },
  done,
  {
    getUserByID = gu,
    sessionStore: { getUserID = getUserIDFromSession } = {}
  } = {}
) => {
  try {
    logger.silly(`attempting to deserialize a user, session = ${sessionID}`);

    const userID = await getUserID(sessionID);
    if (userID) {
      const user = await getUserByID(userID);

      if (user) {
        logger.silly(`successfully deserialized the user`);
        done(null, user);
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
