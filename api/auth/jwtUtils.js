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

  if (token && token !== '') {
    if (token.match(/^bearer\s/i)) {
      const [temp, result] = token.split(' '); // eslint-disable-line no-unused-vars
      return result;
    }
  }

  const { url } = req;
  const cookieStr = req.get('Cookie');
  if (url && url.match(/^\/apds\/(\d+)\/files/i) && cookieStr) {
    // because our image files within the RTE are just img tags
    // we cannot append our authorization header, but because
    // we are storing our access token in a cookie, we can read
    // the access token from there in this instance
    const re = /;\s*/;
    const cookies = cookieStr.split(re); // split the cookie string into individual cookies
    const accessTokenObj = cookies.find(cookie =>
      cookie.match(/^gov.cms.eapd.api-token/i)
    ); // find the cookie that stores the access token
    if (accessTokenObj) {
      // eslint-disable-next-line no-unused-vars
      const [key, value] = accessTokenObj.split('='); // get the value
      const valueObj = JSON.parse(unescape(value)); // the value is an encoded string, convert it to a json object
      return valueObj.accessToken; // return the access token
    }
  }
  return null;
};

module.exports = {
  verifyWebToken,
  jwtExtractor
};
