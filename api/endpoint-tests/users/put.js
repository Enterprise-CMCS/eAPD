const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

tap.test('users endpoint | PUT /users/:userID', async putUsersTests => {
  await db().seed.run();

  const url = getFullPath('/users');

  unauthenticatedTest('put', `${url}/1001`, putUsersTests);
  unauthorizedTest('put', `${url}/1001`, putUsersTests);

  putUsersTests.test('when authenticated', async authenticatedTests => {
    const cookies = await login();

    authenticatedTests.test('with an invalid ID', async invalidTest => {
      const { response, body } = await request.put(`${url}/9001`, {
        jar: cookies,
        json: {}
      });
      invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
      invalidTest.notOk(body, 'does not send a body');
    });

    authenticatedTests.test(
      'with email that already exists',
      async invalidTest => {
        const { response, body } = await request.put(`${url}/57`, {
          jar: cookies,
          json: { email: 'user2@email' }
        });
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.same(body, { error: 'edit-user-email-exists' });
      }
    );

    authenticatedTests.test('with simple password', async invalidTest => {
      const { response, body } = await request.put(`${url}/57`, {
        jar: cookies,
        json: { password: 'password' }
      });
      invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
      invalidTest.same(body, { error: 'edit-user-weak-password' });
    });

    authenticatedTests.test('with valid user info', async validTest => {
      const { response, body } = await request.put(`${url}/57`, {
        jar: cookies,
        json: {
          email: 'new-email',
          name: 'Inigo Montoya',
          position: 'Centerfield',
          phone: '5558675309',
          state: 'FR'
        }
      });
      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.same(
        body,
        {
          id: 57,
          email: 'new-email',
          name: 'Inigo Montoya',
          position: 'Centerfield',
          phone: '5558675309',
          state: 'FR'
        },
        'returns an object for the requested user'
      );

      const user = await db()('users')
        .where({ id: 57 })
        .first();

      validTest.equal(
        user.email,
        'new-email',
        'user email was updated in the database'
      );
      validTest.equal(
        user.name,
        'Inigo Montoya',
        'user name was updated in the database'
      );
      validTest.equal(
        user.position,
        'Centerfield',
        'user position was updated in the database'
      );
      validTest.equal(
        user.phone,
        '5558675309',
        'user phone was updated in the database'
      );
      validTest.equal(
        user.state,
        'FR',
        'user state was updated in the database'
      );
    });
  });
});
