const logger = require('../logger')('jwtUtils');
const { verifyJWT } = require('./oktaAuth');

/**
 * Returns the payload from the signed JWT, or false.
 * Uses Okta to verify and decode the token.
 * @name verifyWebToken
 * @param {String} token - signed JWT
 * @returns {(Object|Boolean)} JWT payload, or false
 */
const verifyWebToken = async (token, { verifier = verifyJWT } = {}) => {
  return verifier(token)
    .then(claims => {
      // the token is valid (per Okta)
      return claims;
    })
    .catch(err => {
      // a validation failed, inspect the error
      logger.error(token, `invalid token: ${err.message}`);
      return false;
    });
};

/**
 * Extracts the JWT from the Request Authorization Header.
 * @name jwtExtractor
 * @param {Object} req - request
 * @returns {(String|null)} JWT string or null
 */
const jwtExtractor = req => {
  const token = req.get('Authorization');
  if (!token || !token.toLowerCase().match(/^bearer\s.+\..+\..+/)) return null;
  const [temp, result] = token.split(' '); // eslint-disable-line no-unused-vars
  return result;
};

module.exports = {
  verifyWebToken,
  jwtExtractor
};
