const OktaJwtVerifier = require('@okta/jwt-verifier');
const Okta = require('@okta/okta-sdk-nodejs');
const logger = require('../logger')('okta utils');
const {
  mockCallOktaEndpoint,
  mockOktaClient,
  mockVerifyJWT
} = require('./mockedOktaAuth');

const { OKTA_DOMAIN, OKTA_SERVER_ID, OKTA_CLIENT_ID, OKTA_API_KEY } =
  process.env;
const OKTA_ISSUER = `${OKTA_DOMAIN}/oauth2/${OKTA_SERVER_ID}`;

/**
 * Returns the User Application Profile URL
 * @param {string} id the user's id
 * @returns a url
 */
const userApplicationProfileUrl = id =>
  `/api/v1/apps/${OKTA_CLIENT_ID}/users/${id}`;

/** Creates Okta Client */
const actualOktaClient = new Okta.Client({
  orgUrl: OKTA_DOMAIN,
  token: OKTA_API_KEY
});

/**
 * Calls an Okta endpoint not covered by the Okta SDK
 * @param {string} endpoint the endpoint to call
 * @param {Object}
 * @returns the data object received from the endpoint
 */
const actualCallOktaEndpoint = async (
  endpoint,
  { method = 'GET', body = {}, client = actualOktaClient } = {}
) => {
  const request = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (method === 'POST' && body !== {}) {
    request.body = body;
  }

  return client.http
    .http(`${OKTA_DOMAIN}${endpoint}`, request)
    .then(res => res.json())
    .then(data => {
      return {
        data
      };
    })
    .catch(error => {
      logger.error(error);
      return { data: null };
    });
};

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
const actualVerifyJWT = (token, { verifier = oktaVerifier } = {}) => {
  return verifier
    .verifyAccessToken(token, 'MacPRO-eAPD')
    .then(({ claims }) => {
      // the token is valid (per definition of 'valid' above)
      return claims;
    })
    .catch(error => {
      logger.error({ error });
      return false;
    });
};

if (process.env.NODE_ENV === 'test') {
  module.exports = {
    userApplicationProfileUrl,
    oktaClient: mockOktaClient,
    callOktaEndpoint: mockCallOktaEndpoint,
    verifyJWT: mockVerifyJWT,
    actualOktaClient,
    actualCallOktaEndpoint,
    actualVerifyJWT
  };
} else {
  module.exports = {
    userApplicationProfileUrl,
    oktaClient: actualOktaClient,
    callOktaEndpoint: actualCallOktaEndpoint,
    verifyJWT: actualVerifyJWT
  };
}
