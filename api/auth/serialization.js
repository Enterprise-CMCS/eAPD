const logger = require('../logger')('user serialization');
const { knex } = require('../db');

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
  { db = knex, sessionStore: { getUserID = getUserIDFromSession } = {} } = {}
) => {
  try {
    logger.silly(`attempting to deserialize a user, session = ${sessionID}`);

    const userID = await getUserID(sessionID);
    if (userID) {
      const user = await knex('users')
        .where('id', userID)
        .first();

      const authRole = await db('auth_roles')
        .where('name', user.auth_role)
        .select('id')
        .first();

      const authActivityIDs = authRole
        ? await db('auth_role_activity_mapping')
            .where('role_id', authRole.id)
            .select('activity_id')
        : [];

      const authActivityNames = await db('auth_activities')
        // eslint-disable-next-line camelcase
        .whereIn('id', authActivityIDs.map(({ activity_id }) => activity_id))
        .select('name');

      if (user) {
        logger.silly(`successfully deserialized the user`);
        done(null, {
          username: user.email,
          id: user.id,
          name: user.name,
          phone: user.phone,
          position: user.position,
          role: user.auth_role,
          state: user.state_id,
          activities: authActivityNames.map(({ name }) => name)
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
