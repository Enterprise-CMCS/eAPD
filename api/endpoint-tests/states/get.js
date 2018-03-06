const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { db, getFullPath, login, request } = require('../utils');

tap.test('states endpoint | GET /states', async getUserStateProgramTest => {
  const url = getFullPath('/states');
  await db().seed.run();

  getUserStateProgramTest.test('when unauthenticated', async invalidTest => {
    const { response, body } = await request.get(url);

    invalidTest.equal(response.statusCode, 403, 'gives a 403 status code');
    invalidTest.notOk(body, 'does not send a body');
  });

  getUserStateProgramTest.test(
    'when authenticated as a user without an associated state',
    async invalidTest => {
      const cookies = await login();
      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.notOk(body, 'does not send a body');
    }
  );

  getUserStateProgramTest.test(
    'when authenticated as a user with an associated state',
    async validTest => {
      const cookies = await login('user2@email', 'something');
      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.match(
        body,
        {
          id: 'mn',
          medicaid_office: { office: 'address' },
          name: 'Minnesota',
          program_benefits: 'The program will have benefits',
          program_vision: 'The program vision is 20/20',
          state_pocs: { pocs: 'people' }
        },
        'sends the expected body'
      );
    }
  );
});

tap.test('states/:id endpoint | GET /states/:id', async getStateProgramTest => {
  const url = getFullPath('/states/mn');
  await db().seed.run();

  getStateProgramTest.test('when unauthenticated', async invalidTest => {
    const { response, body } = await request.get(url);

    invalidTest.equal(response.statusCode, 403, 'gives a 403 status code');
    invalidTest.notOk(body, 'does not send a body');
  });

  getStateProgramTest.test(
    'when authenticated as a user without permission',
    async invalidTest => {
      const cookies = await login('user2@email', 'something');
      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.notOk(body, 'does not send a body');
    }
  );

  getStateProgramTest.test(
    'when authenticated as a user with permission',
    async authenticatedTest => {
      const cookies = await login();

      authenticatedTest.test(
        'with a non-existant state ID',
        async invalidTest => {
          const { response, body } = await request.get(
            getFullPath('/states/baloney'),
            {
              jar: cookies,
              json: true
            }
          );

          invalidTest.equal(
            response.statusCode,
            404,
            'gives a 404 status code'
          );
          invalidTest.notOk(body, 'does not send a body');
        }
      );

      authenticatedTest.test('with a real state ID', async validTest => {
        const { response, body } = await request.get(url, {
          jar: cookies,
          json: true
        });

        validTest.equal(response.statusCode, 200, 'gives a 200 status code');
        validTest.match(
          body,
          {
            id: 'mn',
            medicaid_office: { office: 'address' },
            name: 'Minnesota',
            program_benefits: 'The program will have benefits',
            program_vision: 'The program vision is 20/20',
            state_pocs: { pocs: 'people' }
          },
          'sends the expected body'
        );
      });
    }
  );
});
