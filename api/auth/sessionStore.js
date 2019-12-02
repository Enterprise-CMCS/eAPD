const crypto = require('crypto');
const logger = require('../logger')('session management');
const { raw: knex } = require('../db');

const sessionLifetimeMilliseconds =
  +process.env.SESSION_LIFETIME_MINUTES * 60 * 1000;

const removeExpired = async ({ db = knex } = {}) => {
  logger.silly('removing expired sessions');
  try {
    await db('auth_sessions')
      .where('expiration', '<', Date.now())
      .del();
  } catch (e) {
    logger.error('error removing expired sessions', e);
  }
};

/**
 * Create a new authentication session for a given user and return the new
 * session ID.
 *
 * @param {Number} userID The user ID that owns the new session.
 *
 * @returns {Promise<String>} Resolves the new session ID or null if the
 *                            there is an error saving the session.
 */
const addUserSession = async (userID, { db = knex } = {}) => {
  const sessionID = crypto.randomBytes(48).toString('base64');
  logger.verbose(
    `adding session for user ${userID}, session ID = ${sessionID}`
  );

  try {
    await db('auth_sessions').insert({
      session_id: sessionID,
      user_id: userID,
      expiration: Date.now() + sessionLifetimeMilliseconds
    });
  } catch (e) {
    logger.error(`error saving ${sessionID} to database`, e);
    return null;
  }

  return sessionID;
};

/**
 * Get a user ID from a session ID.
 *
 * @param {String} sessionID The session to fetch
 *
 * @returns {Promise<Number>} Resolves the user ID of the owner of the session,
 *                            or null if there is an error or the session does
 *                            not exist.
 */
const getUserIDFromSession = async (sessionID, { db = knex } = {}) => {
  await removeExpired({ db });
  logger.silly(`fetching user ID for session ${sessionID}`);

  try {
    const session = await db('auth_sessions')
      .where('session_id', sessionID)
      .andWhere('expiration', '>', Date.now())
      .select('user_id')
      .first();

    if (session) {
      logger.silly(`got user ID ${session.user_id}`);
      logger.silly(`extending session lifetime`);
      await db('auth_sessions')
        .where('session_id', sessionID)
        .update({ expiration: Date.now() + sessionLifetimeMilliseconds });
      return session.user_id;
    }
  } catch (e) {
    logger.error(`error fetching session for id ${sessionID}`, e);
  }

  logger.silly(`no session`);
  return null;
};

/**
 * Remove a session so that it is no longer valid.
 *
 * @param {String} sessionID The session to remove.
 *
 * @returns {Promise} Resolves when finished.
 */
const removeUserSession = async (sessionID, { db = knex } = {}) => {
  logger.silly(`deleting session ${sessionID}`);
  try {
    await db('auth_sessions')
      .where('session_id', sessionID)
      .del();
  } catch (e) {
    logger.error(`error deleting session ${sessionID}`, e);
  }
};

module.exports = {
  addUserSession,
  getUserIDFromSession,
  removeUserSession
};
