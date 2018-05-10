const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../utils');

const { invalid: invalidData } = require('../../test-data/state');

const sharedTests = (url, cookies, parentTest) => {
  invalidData.forEach(scenario => {
    parentTest.test(scenario.name, async invalidTest => {
      const { response: { statusCode }, body } = await request.put(url, {
        jar: cookies,
        json: scenario.body
      });

      invalidTest.equal(statusCode, 400, 'gives a 400 status code');
      invalidTest.match(
        body,
        { error: scenario.token },
        'sends back an error token'
      );
    });
  });

  parentTest.test('with a valid update', async validTest => {
    const { response: { statusCode }, body } = await request.put(url, {
      jar: cookies,
      json: { program_benefits: 'new program benefits' }
    });

    validTest.equal(statusCode, 200, 'gives a 200 status code');
    validTest.match(
      body,
      {
        id: 'mn',
        name: 'Minnesota',
        medicaid_office: {
          address1: '100 Round Sq',
          city: 'Cityville',
          state: 'Minnesota',
          zip: '12345',
          director: {
            name: 'Cornelius Fudge',
            email: 'c.fudge@ministry.magic',
            phone: '5551234567'
          }
        },
        program_benefits: 'new program benefits',
        program_vision: 'The program vision is 20/20',
        state_pocs: [
          {
            name: 'Corinne Johnson',
            email: 'corinne@thatplace',
            position: 'Head of Muggle Studies'
          }
        ]
      },
      'sends back the expected object'
    );
  });
};

tap.test('states endpoint | PUT /states', async putUserStateTest => {
  const url = getFullPath('/states');
  await db().seed.run();

  unauthenticatedTest('put', url, putUserStateTest);

  putUserStateTest.test(
    'when authenticated as a user without an associated state',
    async invalidTest => {
      const cookies = await login('all-permissions-no-state', 'password');
      const { response: { statusCode }, body } = await request.put(url, {
        jar: cookies,
        json: true
      });

      invalidTest.equal(statusCode, 401, 'gives a 401 status code');
      invalidTest.notOk(body, 'does not send a body');
    }
  );

  putUserStateTest.test(
    'when authenticated as a user with an associated state',
    async validUserTests => {
      const cookies = await login();
      sharedTests(url, cookies, validUserTests);
    }
  );
});
