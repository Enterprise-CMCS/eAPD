// Passport.js user serialization methods.

const logger = require('../logger')('user serialization');
const { getUserByID: gu } = require('../db');

const { addUserSession, getUserIDFromSession } = require('./sessionStore');

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = async (
  user,
  { sessionStore: { addSession = addUserSession } = {} } = {}
) => {
  logger.silly(`serializing a user with id ${user.id}`);
  return addSession(user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = async (
  sessionID,
  {
    getUserByID = gu,
    sessionStore: { getUserID = getUserIDFromSession } = {}
  } = {}
) => {
  let user = null;
  try {
    logger.silly(`attempting to deserialize a user, session = ${sessionID}`);
    const userID = await getUserID(sessionID);
    if (userID) {
      user = await getUserByID(userID);
      if (user) {
        logger.silly(`successfully deserialized the user`);
      } else {
        logger.verbose(`could not deserialize user`, userID);
      }
    } else {
      logger.warn(`${sessionID} does not map to a user ID`);
    }
  } catch (e) {
    logger.error(null, e);
    logger.silly('Could not deserialize user');
  }
  return user;
};
