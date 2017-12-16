const clientSessions = require('client-sessions');

module.exports.getSessionFunction = function getSessionFunction(sessions = clientSessions) {
  return sessions({
    cookieName: 'user', // this is the cookie name passport writes to
    secret: process.env.SESSION_SECRET,
    duration: 14 * 24 * 60 * 60 * 1000, // session lifetime, in milliseconds
    cookie: {
      httpOnly: true
    }
  });
};
