const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const logger = require('../logger')('jwtUtils');

const { SESSION_LIFETIME_MINUTES, SESSION_SECRET } = process.env

const TOKEN_ISSUER = 'CMS eAPD API';
const HS256 = 'HS256';

/**
 * Returns a signed JWT with content as the payload. Inverse function for
 *   verifyWebToken(token).
 * @param {Object} payload - payload of information to be stored within the JWT
 */
const signWebToken = (payload) => {
  const options = {
    algorithm: HS256,
    expiresIn: `${SESSION_LIFETIME_MINUTES}m`,
    issuer: TOKEN_ISSUER
  };

  return jwt.sign(payload, SESSION_SECRET, options);
}

/**
 * Returns the payload from the signed JWT, or false. Inverse function for
 *   signWebToken(payload).
 * @param {String} token - signed JWT
 */
const verifyWebToken = (token) => {
  let payload;
  const options = {
    algorithms: [HS256],
    issuer: TOKEN_ISSUER
  };

  try {
    payload = jwt.verify(token, SESSION_SECRET, options);
  } catch (err) {
    logger.error(token, `invalid token: ${err.message}`);
    return false;
  }

  return payload;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SESSION_SECRET,
  issuer: TOKEN_ISSUER
}

module.exports = {
  signWebToken,
  verifyWebToken,
  jwtOptions
}
