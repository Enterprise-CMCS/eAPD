import jwt from 'jsonwebtoken'; // https://github.com/auth0/node-jsonwebtoken/tree/v8.3.0
import { verifyJWT } from './oktaAuth.js';
import {
  getUserByID,
  populateUserRole,
  userLoggedIntoState
} from '../db/index.js';

/**
 * Returns the payload from the signed JWT, or false.
 * Uses Okta to verify and decode the token.
 * @name verifyWebToken
 * @param {String} token - signed JWT
 * @param {Object} Object containing a verifier to be used.
 * allows for switching between okta and local varification patterns
 * @returns {(Object|Boolean)} JWT payload, or false
 */
export const verifyWebToken = (token, { verifier = verifyJWT } = {}) =>
  verifier(token);

/**
 * Extracts the JWT from the Request Authorization Header.
 * @name jwtExtractor
 * @param {Object} req - request
 * @returns {(String|null)} JWT string or null
 */
export const jwtExtractor = req => {
  const token = req.get('Authorization');

  if (token && token !== '') {
    if (token.match(/^bearer\s/i)) {
      return token.split(' ')[1];
    }
  }

  const { url } = req;
  const cookieStr = req.headers.cookie || req.get('Cookie');
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp(
    /(^\/apds\/([A-Fa-f0-9]+)\/files)|(^\/apds\/([A-Fa-f0-9]+)\/files\/.*)|(^\/auth\/certifications\/files\/.*)/i
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
      const value = accessTokenObj.split('=')[1]; // get the value
      const valueObj = JSON.parse(decodeURIComponent(value)); // the value is an encoded string, convert it to a json object
      return valueObj.accessToken; // return the access token
    }
  }
  return null;
};

// ****** Local JWT implementation below this line
const getSecret = () => {
  return process.env.JWT_SECRET;
};

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
  audience: `eAPD-${process.env.NODE_ENV}`,
  issuer: 'eAPD'
};

export const getDefaultOptions = () => {
  return { ...defaultOptions };
};

export const sign = (payload, options = defaultOptions) => {
  return jwt.sign(payload, getSecret(), options);
};

export const actualVerifyEAPDToken = token => {
  try {
    return jwt.verify(token, getSecret());
  } catch (err) {
    throw new Error('invalid Token');
  }
};

export const verifyEAPDToken = token => {
  if (process.env.NODE_ENV === 'test') {
    return getUserByID(token, false);
  }
  return actualVerifyEAPDToken(token);
};

export const exchangeToken = async (
  req,
  {
    extractor = jwtExtractor,
    verifier = verifyJWT,
    getUser = getUserByID,
    auditUserLogin = userLoggedIntoState
  } = {}
) => {
  const oktaJWT = extractor(req);
  // verify the token using the okta verifier.
  const claims = oktaJWT ? await verifyWebToken(oktaJWT, { verifier }) : false;
  if (!claims) return null;

  const { uid, ...additionalValues } = claims;
  const user = await getUser(uid, true, { additionalValues });
  await auditUserLogin(user);
  user.jwt = sign(user);

  return user;
};

export const updateUserToken = async (
  req,
  {
    extractor = jwtExtractor,
    verifier = verifyEAPDToken,
    getUser = getUserByID
  } = {}
) => {
  const oktaJWT = extractor(req);
  // verify the token using the eAPD verifier.
  const claims = oktaJWT ? await verifyWebToken(oktaJWT, { verifier }) : false;
  if (!claims) return null;

  const { id, ...additionalValues } = claims;
  const user = await getUser(id, true, { additionalValues });
  user.jwt = sign(user);

  return user;
};

export const changeState = async (
  user,
  stateId,
  { populate = populateUserRole, auditUserLogin = userLoggedIntoState } = {}
) => {
  const populatedUser = await populate(user, stateId);
  auditUserLogin(populatedUser, stateId);
  return sign(populatedUser, {});
};
