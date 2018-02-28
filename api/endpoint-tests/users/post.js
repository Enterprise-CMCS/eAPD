const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { db, request, getFullPath, login } = require('../utils');

const newUsersInTheDatabase = async () => {
  // Get all users other than the originals.  User IDs
  // 57 and 58 are created when the database is seeded.
  const users = (await db()('users').select('*')).filter(
    user => user.id !== 57 && user.id !== 58
  );

  return users.length ? users : false;
};

tap.test('users endpoint | POST /users', async postUsersTest => {
  await db().seed.run();

  const url = getFullPath('/users');

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with an invalid body',
      body: { hello: 'world' }
    },
    {
      name: 'with an email but no password',
      body: { email: 'newuser@email.com' }
    },
    {
      name: 'with a password but no email',
      body: { password: 'newpassword' }
    }
  ];

  postUsersTest.test('when unauthenticated', async unauthenticatedTests => {
    [
      ...invalidCases,
      {
        name: 'with a valid body',
        body: { email: 'newuser@email.com', password: 'newpassword' }
      }
    ].forEach(situation => {
      unauthenticatedTests.test(situation.name, async unauthenticatedTest => {
        const { response, body } = await request.post(url, {
          json: situation.body
        });
        unauthenticatedTest.equal(
          response.statusCode,
          403,
          'gives a 403 status code'
        );
        unauthenticatedTest.notOk(body, 'does not send a body');

        const newUsers = await newUsersInTheDatabase();
        unauthenticatedTest.notOk(
          newUsers,
          'a user object is not inserted into the database'
        );
      });
    });
  });

  postUsersTest.test('when authenticated', async authenticatedTests => {
    const cookies = await login();

    invalidCases.forEach(situation => {
      authenticatedTests.test(situation.name, async invalidTest => {
        const { response, body } = await request.post(url, {
          jar: cookies,
          json: situation.body || true
        });
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.same(
          body,
          { error: 'add-user-invalid' },
          'sends a token indicating the failure'
        );

        const newUsers = await newUsersInTheDatabase();
        invalidTest.notOk(
          newUsers,
          'a user object is not inserted into the database'
        );
      });
    });

    authenticatedTests.test(
      'with existing email address',
      async invalidTest => {
        const { response, body } = await request.post(url, {
          jar: cookies,
          json: { email: 'em@il.com', password: 'anything' }
        });
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.same(
          body,
          { error: 'add-user-email-exists' },
          'sends a token indicating the failure'
        );
        const newUsers = await newUsersInTheDatabase();
        invalidTest.notOk(
          newUsers,
          'a user object is not inserted into the database'
        );
      }
    );

    authenticatedTests.test('with a weak password', async invalidTest => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { email: 'newuser@email.com', password: 'Newp@ssw0rd!' }
      });

      invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
      invalidTest.same(
        body,
        { error: 'add-user-weak-password' },
        'sends a token indicating a weak password'
      );

      const newUsers = await newUsersInTheDatabase();
      invalidTest.notOk(
        newUsers,
        'a user object is not inserted into the database'
      );
    });

    authenticatedTests.test('with a valid new user', async validTest => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { email: 'newuser@email.com', password: 'Q%&jsruW$%Jaej' }
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.notOk(body, 'does not send a body');

      const newUsers = await newUsersInTheDatabase();
      validTest.equal(
        newUsers.length,
        1,
        'a user object is inserted into the database'
      );
    });
  });
});
