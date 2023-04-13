import OktaJwtVerifier from '@okta/jwt-verifier';
import Okta from '@okta/okta-sdk-nodejs';
import loggerFactory from '../logger/index.js';
import { mockOktaClient, mockVerifyJWT } from './mockedOktaAuth.js';

const logger = loggerFactory('okta utils');

const {
  OKTA_DOMAIN,
  OKTA_SERVER_ID,
  OKTA_CLIENT_ID,
  OKTA_API_KEY,
  OKTA_AUDIENCE
} = process.env;
const OKTA_ISSUER = `${OKTA_DOMAIN}/oauth2/${OKTA_SERVER_ID}`;

/**
 * Returns the User Application Profile URL
 * @param {string} id the user's id
 * @returns a url
 */
export const userApplicationProfileUrl = id =>
  `/api/v1/apps/${OKTA_CLIENT_ID}/users/${id}`;

/** Creates Okta Client */
export const actualOktaClient = new Okta.Client({
  orgUrl: OKTA_DOMAIN,
  token: OKTA_API_KEY
});

export const oktaClient =
  process.env.NODE_ENV === 'test' ? mockOktaClient : actualOktaClient;

/** Creates Okta Jwt Verifier */
const oktaVerifier = new OktaJwtVerifier({
  issuer: OKTA_ISSUER,
  clientId: OKTA_CLIENT_ID
});

/**
 * Verifies a Jwt against Okta
 * @param {string} token the Jwt token
 * @param {Object}
 */
export const actualVerifyJWT = (token, { verifier = oktaVerifier } = {}) => {
  return verifier
    .verifyAccessToken(token, OKTA_AUDIENCE)
    .then(({ claims }) => {
      // the token is valid (per definition of 'valid' above)
      return claims;
    })
    .catch(error => {
      logger.error({ error });
      return false;
    });
};

export const verifyJWT = (token, props) =>
  process.env.NODE_ENV === 'test'
    ? mockVerifyJWT
    : actualVerifyJWT(token, props);
