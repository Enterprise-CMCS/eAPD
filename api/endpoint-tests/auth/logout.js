const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const { getFullPath } = require('../utils');

tap.test('logout endpoint | /auth/logout', logoutTest => {
  const url = getFullPath('/auth/logout');

  logoutTest.test('not already logged in', test => {
    const cookies = request.jar();

    request.get(url, { jar: cookies }, (err, response) => {
      test.equal(response.statusCode, 200, 'gives a 200 status code');

      // It might be valid for the API to set some header other than
      // the session cookie, but it might also be valid for it to set
      // no headers at all.
      if (response.headers['set-cookie']) {
        test.ok(
          response.headers['set-cookie'].every(
            cookie => !cookie.startsWith('session=')
          ),
          'does not set a session cookie'
        );
      } else {
        test.pass('does not set a session cookie');
      }
      test.done();
    });
  });

  logoutTest.test('already logged in', test => {
    const cookies = request.jar();
    cookies.setCookie('session=this-is-my-session', url);

    request.get(url, { jar: cookies }, (err, response) => {
      test.equal(response.statusCode, 200, 'gives a 200 status code');
      test.ok(
        response.headers['set-cookie'].some(
          cookie =>
            cookie.startsWith('session=') && cookie.endsWith('; httponly')
        ),
        'sends a new http-only session cookie'
      );
      test.ok(
        response.headers['set-cookie'].every(
          cookie => !cookie.startsWith('session=this-is-my-session')
        ),
        'does not just send back the same session cookie'
      );
      test.done();
    });
  });

  logoutTest.done();
});
