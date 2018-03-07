const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

const invalidScenarios = [
  {
    name: 'with an empty medicaid office',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {}
    }
  },
  {
    name: 'with a medicaid office with an invalid address',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address: 0xdeadbeef,
        city: 'city',
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid city',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address: 'address',
        city: 0xdeadbeef,
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid zip',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address: 'address',
        city: 'city',
        zip: 0xdeadbeef
      }
    }
  },
  {
    name: 'with an invalid program benefits statement',
    token: 'edit-state-invalid-benefits',
    body: {
      program_benefits: 0xdeadbeef
    }
  },
  {
    name: 'with an invalid program vision statement',
    token: 'edit-state-invalid-vision',
    body: {
      program_vision: 0xdeadbeef
    }
  },
  {
    name: 'with points of contact with invalid name',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 0xdeadbeef,
          email: 'em@il',
          position: 'position'
        }
      ]
    }
  },
  {
    name: 'with points of contact with invalid email',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 'name',
          email: 'email',
          position: 'position'
        }
      ]
    }
  },
  {
    name: 'with points of contact with invalid position',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 'name',
          email: 'em@il',
          position: 0xdeadbeef
        }
      ]
    }
  }
];

const sharedTests = (url, cookies, parentTest) => {
  invalidScenarios.forEach(scenario => {
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
          address: '100 Round Sq',
          city: 'Cityville',
          zip: '12345'
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
      const cookies = await login();
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
      const cookies = await login('user2@email', 'something');
      sharedTests(url, cookies, validUserTests);
    }
  );
});

tap.test('states endpoint | PUT /states/:id', async putUserStateTest => {
  const url = getFullPath('/states/mn');
  await db().seed.run();

  unauthenticatedTest('put', url, putUserStateTest);
  unauthorizedTest('put', url, putUserStateTest);

  putUserStateTest.test(
    'when authenticated as a user with permission',
    async validUserTests => {
      const cookies = await login();

      validUserTests.test('with a non-existant state ID', async invalidTest => {
        const { response, body } = await request.put(
          getFullPath('/states/baloney'),
          {
            jar: cookies,
            json: true
          }
        );

        invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
        invalidTest.notOk(body, 'does not send a body');
      });

      sharedTests(url, cookies, validUserTests);
    }
  );
});
