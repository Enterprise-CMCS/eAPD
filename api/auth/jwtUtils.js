const jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken/tree/v8.3.0
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
  const regex = new RegExp(
    /(^\/apds\/(\d+)\/files)|(^\/api\/apds\/(\d+)\/files)/i
  );

  if (url && regex.test(url) && cookieStr) {
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

// ****** Local JWT implementation below this line
const getSecret = () => {
  // todo change this. It is pretty bad.
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
}

/*
    algorithm (default: HS256)
    expiresIn || notBefore: expressed in seconds or a string describing a time span zeit/ms.
    Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
    If you use a string be sure you provide the time units (days, hours, etc),
    otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 */
const defaultOptions = {
  algorithm: 'HS256',
  expiresIn: '12h',
  notBefore: '0',
  audience: 'eAPD',
  issuer: 'eAPD',
}

const getDefaultOptions = () =>{
  return {...defaultOptions}
}

const sign = (payload, options=defaultOptions) => {

  return jwt.sign(payload, getSecret(), options);
}

const verify = token => {
  try {
    return jwt.verify(token, getSecret());
  } catch (err) {
    throw new Error('invalid Token')
  }
}

module.exports = {
  verifyWebToken,
  jwtExtractor,
  getDefaultOptions,
  sign,
  verify
};
