const logger = require('../logger')('auth session');
const clientSessions = require('client-sessions');

// Sets up sessions to be stored in browser cookies.  This
// configures the cookie that will be used.
module.exports.getSessionFunction = function getSessionFunction(
  sessions = clientSessions
) {
  logger.silly('setting up client sessions');
  return sessions({
    // Passport's session support writes to the 'session'
    // cookie, so we have to use that name
    cookieName: 'session',

    secret: process.env.SESSION_SECRET, // crypto secret, used to encrypt the session cookie
    duration: 2 * 24 * 60 * 60 * 1000, // session lifetime, in milliseconds

    // This is how long to extend the session life on user
    // activity.  Without this, the session will expire at
    // the end of duration, no matter whether they're active
    // or not.  Here, we're just extending the session back
    // to its full life with any activity.  Good enough for
    // getting started.
    activeDuration: 2 * 24 * 60 * 60 * 1000,
    cookie: {
      httpOnly: true
    }
  });
};
