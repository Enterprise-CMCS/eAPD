import { OktaAuth } from '@okta/okta-auth-js';

const OKTA_DOMAIN = process.env.OKTA_DOMAIN; // eslint-disable-line prefer-destructuring
const OKTA_SERVER_ID = process.env.OKTA_SERVER_ID; // eslint-disable-line prefer-destructuring
const OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID; // eslint-disable-line prefer-destructuring
const OKTA_ISSUER = `${OKTA_DOMAIN}/oauth2/${OKTA_SERVER_ID}`;
const OKTA_REDIRECT_URI = `${window.location.origin}/implicit/callback`;

const oktaAuth =
  OKTA_DOMAIN && OKTA_SERVER_ID && OKTA_CLIENT_ID
    ? new OktaAuth({
        issuer: OKTA_ISSUER,
        url: OKTA_DOMAIN,
        clientId: OKTA_CLIENT_ID,
        redirectUri: OKTA_REDIRECT_URI,
        tokenManager: {
          storage: 'localStorage',
          expireEarlySeconds: 305, // alerts the user 5 minutes and 5 seconds before session ends
          // the 5 seconds gives users the full 5 minutes to select continue
          autoRenew: false // renewing based on user interactions
        }
      })
    : null;

oktaAuth.authStateManager.subscribe(() => {});
if (!oktaAuth.isLoginRedirect()) {
  // Trigger an initial authState change event when the app startup
  oktaAuth.authStateManager.updateAuthState();
}

export default oktaAuth;
