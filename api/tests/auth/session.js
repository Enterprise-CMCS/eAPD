const tap = require('tap');
const sinon = require('sinon');

const getSessionFunction = require('../../auth/session').getSessionFunction;

tap.test('session function', (sessionTest) => {
  const sessions = sinon.spy();

  process.env.SESSION_SECRET = 'secret';
  getSessionFunction(sessions);

  sessionTest.ok(sessions.calledWith(sinon.match.object), 'called with a configuration object');
  const config = sessions.args[0][0];
  sessionTest.equal(config.cookieName, 'user', 'session uses the "user" cookie - required by passport');
  sessionTest.equal(config.cookie.httpOnly, true, 'session cookie is HTTP-only');
  sessionTest.equal(config.secret, 'secret', 'session secret is set from environment');
  sessionTest.ok(config.duration < 30 * 24 * 60 * 60 * 1000, 'session cookie lasts less than 30 days');
  sessionTest.done();
});
