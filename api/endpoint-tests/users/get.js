const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { db, getFullPath, login, request } = require('../utils');

tap.test('users endpoint | GET /users', async getUsersTest => {
  await db().seed.run();

  const url = getFullPath('/users');

  getUsersTest.test('when unauthenticated', async unauthenticatedTest => {
    const { response, body } = await request.get(url);
    unauthenticatedTest.equal(
      response.statusCode,
      403,
      'gives a 403 status code'
    );
    unauthenticatedTest.notOk(body, 'does not send a body');
  });

  getUsersTest.test('when authenticated', async validTest => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    validTest.equal(response.statusCode, 200, 'gives a 200 status code');
    validTest.same(
      body,
      [{ id: 57, email: 'em@il.com' }],
      'returns an array of known users'
    );
  });
});

tap.test('users endpoint | GET /user/:userID', async getUserTest => {
  const url = getFullPath('/user');

  getUserTest.test('when unauthenticated', async unauthenticatedTests => {
    [
      { name: 'when requesting an invalid user ID', id: 'random-id' },
      { name: 'when requesting a non-existing user ID', id: 500 },
      { name: 'when requesting a valid user ID', id: 57 }
    ].forEach(situation => {
      unauthenticatedTests.test(situation.name, async unauthentedTest => {
        const { response, body } = await request.get(`${url}/${situation.id}`);
        unauthentedTest.equal(
          response.statusCode,
          403,
          'gives a 403 status code'
        );
        unauthentedTest.notOk(body, 'does not send a body');
      });
    });
  });

  getUserTest.test('when authenticated', async authenticatedTests => {
    authenticatedTests.test(
      'when requesting an invalid user ID',
      async invalidTest => {
        const cookies = await login();
        const { response, body } = await request.get(`${url}/random-id`, {
          jar: cookies,
          json: true
        });

        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.same(
          body,
          { error: 'get-user-invalid' },
          'sends a token indicating the failure'
        );
      }
    );

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
