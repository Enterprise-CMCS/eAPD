const jwt = require('jsonwebtoken');
const logger = require('../logger')('jwtUtils');

const { SESSION_LIFETIME_MINUTES, SESSION_SECRET } = process.env

const TOKEN_ISSUER = 'CMS eAPD API';
const HS256 = 'HS256';

/**
 * Returns a signed JWT with content as the payload. Inverse function for
 *   verifyWebToken(token).
 * @param {Object} payload - payload of information to be stored within the JWT
 * @returns {string} signed JWT
 */
const signWebToken = (payload) => {
  const options = {
    algorithm: HS256,
    expiresIn: `${SESSION_LIFETIME_MINUTES || 5}m`,
    issuer: TOKEN_ISSUER
  };

  return jwt.sign(payload, SESSION_SECRET, options);
}

/**
 * Returns the payload from the signed JWT, or false. Inverse function for
 *   signWebToken(payload).
 * @param {string} token - signed JWT
 * @returns {(Object|boolean)} JWT payload, or false
 */
const jsonWebTokenOptions = {
  algorithms: [HS256],
  issuer: TOKEN_ISSUER
};

const verifyWebToken = (token) => {
  let payload;

  try {
    payload = jwt.verify(token, SESSION_SECRET, jsonWebTokenOptions);
  } catch (err) {
    logger.error(token, `invalid token: ${err.message}`);
    return false;
  }

  return payload;
}

/**
 * Extracts the JWT from the Request Authorization Header.
 * @param {Object} req - request
 * @returns {(string|null)} JWT string or null
 */
const jwtExtractor = (req) => {
  let jwt = req.get('Authorization');
  if (!jwt) return null;
  jwt = jwt.replace('Bearer ', '');
  return jwt;
}

module.exports = {
  jwtExtractor,
  signWebToken,
  verifyWebToken
}
