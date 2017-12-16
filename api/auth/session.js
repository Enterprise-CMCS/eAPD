const clientSessions = require('client-sessions');

// Sets up sessions to be stored in browser cookies.  This
// configures the cookie that will be used.
module.exports.getSessionFunction = function getSessionFunction(sessions = clientSessions) {
  return sessions({
    cookieName: 'user', // passport's session support writes to the 'user' cookie, so we have to use that name
    secret: process.env.SESSION_SECRET, // crypto secret, used to encrypt the session cookie
    duration: 14 * 24 * 60 * 60 * 1000, // session lifetime, in milliseconds
    cookie: {
      httpOnly: true
    }
  });
};
