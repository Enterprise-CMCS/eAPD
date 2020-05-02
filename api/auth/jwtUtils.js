const jwt = require('jsonwebtoken');
const logger = require('../logger')('jwtUtils');

const { SESSION_LIFETIME_MINUTES, SESSION_SECRET } = process.env;

const TOKEN_ISSUER = 'CMS eAPD API';
const HS256 = 'HS256';

/**
 * Returns a signed JWT with content as the payload. Inverse function for
 *   verifyWebToken(token).
 * @param {Object} payload - payload of information to be stored within the JWT
 * @returns {String} signed JWT
 */
const signWebToken = payload => {
  const options = {
    algorithm: HS256,
    expiresIn: `${SESSION_LIFETIME_MINUTES || 5}m`,
    issuer: TOKEN_ISSUER
  };

  return jwt.sign(payload, SESSION_SECRET, options);
};

/**
 * Returns the payload from the signed JWT, or false. Inverse function for
 *   signWebToken(payload).
 * @param {String} token - signed JWT
 * @returns {(Object|Boolean)} JWT payload, or false
 */
const verifyWebToken = token => {
  const options = {
    algorithms: [HS256],
    issuer: TOKEN_ISSUER
  };

  let payload;

  try {
    payload = jwt.verify(token, SESSION_SECRET, options);
  } catch (err) {
    logger.error(token, `invalid token: ${err.message}`);
    return false;
  }

  return payload;
};

/**
 * Extracts the JWT from the Request Authorization Header.
 * @param {Object} req - request
 * @returns {(String|null)} JWT string or null
 */
const jwtExtractor = req => {
  let token = req.get('Authorization');
  if (!token) return null;
  token = token.replace('Bearer ', '');
  return token;
};

module.exports = {
  jwtExtractor,
  signWebToken,
  verifyWebToken
};
