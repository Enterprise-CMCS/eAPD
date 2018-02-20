const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { db, request, getFullPath, login } = require('../utils');

tap.test('roles endpoint | PUT /roles/:roleID', async postRolesTests => {
  await db().seed.run();

  const url = getFullPath('/roles');

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with no activities',
      body: { name: 'new-role' }
    },
    {
      name: 'with activities not an array',
      body: { name: 'new-role', activities: 'wrong' }
    },
    {
      name: 'with activities where some are not numbers',
      body: { name: 'new-role', activities: [0, 'wrong', 2] }
    },
    {
      name: 'with activities that are not valid',
      body: { name: 'new-role', activities: [1, 2, 9001] }
    }
  ];

  postRolesTests.test(
    'when unauthenticated, invalid ID',
    async unauthenticatedTests => {
      [
        ...invalidCases,
        {
          name: 'with a valid body',
          body: { activities: [1, 2] }
        }
      ].forEach(situation => {
        unauthenticatedTests.test(situation.name, async unauthenticatedTest => {
          const { response, body } = await request.put(`${url}/9001`, {
            json: situation.body
          });
          unauthenticatedTest.equal(
            response.statusCode,
            403,
            'gives a 403 status code'
          );
          unauthenticatedTest.notOk(body, 'does not send a body');
        });
      });
    }
  );

  postRolesTests.test(
    'when unauthenticated, valid ID',
    async unauthenticatedTests => {
      [
        ...invalidCases,
        {
          name: 'with a valid body',
          body: { activities: [1, 2] }
        }
      ].forEach(situation => {
        unauthenticatedTests.test(situation.name, async unauthenticatedTest => {
          const { response, body } = await request.put(`${url}/1`, {
            json: situation.body
          });
          unauthenticatedTest.equal(
            response.statusCode,
            403,
            'gives a 403 status code'
          );
          unauthenticatedTest.notOk(body, 'does not send a body');
        });
      });
    }
  );

  postRolesTests.test('when authenticated', async authenticatedTests => {
    const cookies = await login();

    authenticatedTests.test('with an invalid ID', async invalidTest => {
      const { response, body } = await request.put(`${url}/9001`, {
        jar: cookies,
        json: {}
      });
      invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
      invalidTest.notOk(body, 'does not send a body');
    });

    invalidCases.forEach(situation => {
      authenticatedTests.test(situation.name, async invalidTest => {
        const { response, body } = await request.put(`${url}/1`, {
          jar: cookies,
          json: situation.body || true
        });
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.same(
          body,
          { error: 'edit-role-invalid' },
          'sends a token indicating the failure'
        );
      });
    });

    authenticatedTests.test('with a valid updated role', async validTest => {
      const { response, body } = await request.put(`${url}/1`, {
        jar: cookies,
        json: { activities: [1] }
      });

      validTest.equal(response.statusCode, 204, 'gives a 204 status code');
      validTest.notOk(body, 'does not send a body');

      const activities = await db()('auth_role_activity_mapping')
        .where({ role_id: 1 })
        .select('activity_id')
        .map(activity => activity.activity_id);

      validTest.same(
        activities,
        [1],
        'sets up a mapping between the role and the newly-requested activities'
      );
    });
  });
});
