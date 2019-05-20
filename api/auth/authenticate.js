const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const defaultHash = require('./passwordHash');
const logger = require('../logger')('authentication');
const defaultUserModel = require('../db').models.user;

// This value doesn't need to be persisted between process instances of the
// server. It only needs to persist between the request for the nonce and the
// request to authenticate. Using a random secret on every process restart
// should somewhat increase security - automatic key cycling!
const NONCE_SECRET = crypto.randomBytes(64);

module.exports = (userModel = defaultUserModel, hash = defaultHash) => async (
  nonce,
  password,
  done
) => {
  try {
    logger.verbose(`got authentication request. decoding jwt...`);
    let verified = false;
    try {
      // Supplying a secret to the verify call mitigates the "none" algorithm
      // vulnerability, but let's specify our algorithms anayway.
      verified = jwt.verify(nonce, NONCE_SECRET, { algorithms: ['HS256'] });
    } catch (e) {
      logger.error(`error decoding token: ${e.message}`);
      return done(null, false);
    }

    const username = verified.username;
    logger.verbose(`authentication request for [${username}]`);

    const user = await userModel
      .query('whereRaw', 'LOWER(email) = ?', [username.toLowerCase()])
      .fetch({ withRelated: ['state'] });

    if (user && (await hash.compare(password, user.get('password')))) {
      logger.verbose(`authenticated user [${username}]`);
      return done(null, {
        username: user.get('email'),
        id: user.get('id'),
        role: user.get('auth_role'),
        state: user.get('state_id'),
        activities: await user.activities(),
        model: user
      });
    }

    logger.verbose(`no user found or password mismatch for [${username}]`);
    return done(null, false);
  } catch (e) {
    logger.error(null, e);
    return done('Error');
  }
};

/**
 * Get an authentication nonce
 * @param {String} username - Username associated with the nonce
 */
module.exports.getNonce = username =>
  jwt.sign({ username }, NONCE_SECRET, {
    algorithm: 'HS256',
    expiresIn: '3s'
  });
