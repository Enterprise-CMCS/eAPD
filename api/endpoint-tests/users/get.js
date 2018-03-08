const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

const url = getFullPath('/users');

tap.test('users endpoint | GET /users', async getUsersTest => {
  await db().seed.run();

  unauthenticatedTest('get', url, getUsersTest);
  unauthorizedTest('get', url, getUsersTest);

  getUsersTest.test('when authenticated', async validTest => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    validTest.equal(response.statusCode, 200, 'gives a 200 status code');
    validTest.ok(Array.isArray(body), 'body is an array');
    body.forEach(user =>
      validTest.match(user, { id: /\d+/, email: /.+/ }, 'ever user is valid')
    );
  });
});

tap.test('users endpoint | GET /users/:userID', async getUserTest => {
  await db().seed.run();

  unauthenticatedTest('get', `${url}/some-id`, getUserTest);
  unauthorizedTest('get', `${url}/some-id`, getUserTest);

  getUserTest.test('when authenticated', async authenticatedTests => {
    authenticatedTests.test(
      'when requesting a non-existant user ID',
      async invalidTest => {
        const cookies = await login();
        const { response, body } = await request.get(`${url}/500`, {
          jar: cookies,
          json: true
        });

        invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
        invalidTest.notOk(body, 'does not send a body');
      }
    );

    authenticatedTests.test(
      'when requesting a valid user ID',
      async validTest => {
        const cookies = await login();
        const { response, body } = await request.get(`${url}/57`, {
          jar: cookies,
          json: true
        });
        validTest.equal(response.statusCode, 200, 'gives a 200 status code');
        validTest.same(
          body,
          {
            id: 57,
            email: 'em@il.com',
            name: null,
            position: null,
            phone: null,
            state: null
          },
          'returns an object for the requested user'
        );
      }
    );
  });
});
