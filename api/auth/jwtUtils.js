const jwt = require('jsonwebtoken');
const logger = require('../logger')('jwtUtils');

const { SESSION_LIFETIME_MINUTES, SESSION_SECRET } = process.env;

const TOKEN_ISSUER = 'CMS eAPD API';
const HS256 = 'HS256';

/**
 * Returns a signed JWT with content as the payload. Inverse function for
 *   verifyWebToken(token).
 * @name signWebToken
 * @param {Object} payload - payload of information to be stored within the JWT
 * @returns {String} signed JWT
 */
const signWebTokenOptions = {
  algorithm: HS256,
  expiresIn: `${SESSION_LIFETIME_MINUTES || 5}m`,
  issuer: TOKEN_ISSUER
};

const signWebToken = payload => {
  return jwt.sign(payload, SESSION_SECRET, signWebTokenOptions);
};

/**
 * Returns the payload from the signed JWT, or false. Inverse function for
 *   signWebToken(payload).
 * @name verifyWebToken
 * @param {String} token - signed JWT
 * @returns {(Object|Boolean)} JWT payload, or false
 */
const verifyWebTokenOptions = {
  algorithms: [HS256],
  issuer: TOKEN_ISSUER
};

const verifyWebToken = token => {
  let payload;
  try {
    payload = jwt.verify(token, SESSION_SECRET, verifyWebTokenOptions);
  } catch (err) {
    logger.error(token, `invalid token: ${err.message}`);
    return false;
  }
  return payload;
};

/**
 * Extracts the JWT from the Request Authorization Header.
 * @name jwtExtractor
 * @param {Object} req - request
 * @returns {(String|null)} JWT string or null
 */
const jwtExtractor = req => {
  let temp;
  let token = req.get('Authorization');
  if (!token || !token.toLowerCase().match(/^bearer\s.+\..+\..+/)) return null;
  [temp, token] = token.split(' ');
  return token;
};

module.exports = {
  jwtExtractor,
  signWebToken,
  signWebTokenOptions,
  verifyWebToken,
  verifyWebTokenOptions
};
