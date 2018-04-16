const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

tap.test('auth roles endpoint | POST /auth/roles', async postRolesTests => {
  await db().seed.run();

  const url = getFullPath('/auth/roles');

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with no name',
      body: {}
    },
    {
      name: 'with an existing name',
      body: { name: 'admin' }
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
      body: { name: 'new-role', activities: [1001, 1002, 9001] }
    }
  ];

  unauthenticatedTest('post', url, postRolesTests);
  unauthorizedTest('post', url, postRolesTests);

  postRolesTests.test('when authenticated', async authenticatedTests => {
    const cookies = await login();

    invalidCases.forEach(situation => {
      authenticatedTests.test(situation.name, async invalidTest => {
        const { response, body } = await request.post(url, {
          jar: cookies,
          json: situation.body || true
        });
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.match(
          body,
          { error: /^add-role-.+$/ },
          'sends a token indicating the failure'
        );
      });
    });

    authenticatedTests.test('with a valid new role', async validTest => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { name: 'new-role', activities: [1001, 1002] }
      });

      validTest.equal(response.statusCode, 201, 'gives a 201 status code');
      validTest.ok(body, 'sends a body');
      validTest.type(body.id, 'number', 'sends back a numeric role ID');
      validTest.equal(body.name, 'new-role', 'sends back the new role name');
      body.activities.sort();
      validTest.same(
        body.activities,
        ['create-roles', 'view-roles'],
        'sends back the list of activities'
      );

      const role = await db()('auth_roles')
        .where({ name: 'new-role' })
        .first();

      validTest.ok(role, 'a role object is inserted into the database');

      const activities = await db()('auth_role_activity_mapping')
        .where({ role_id: role.id })
        .select('activity_id')
        .map(activity => activity.activity_id);
      activities.sort();

      validTest.same(
        activities,
        [1001, 1002],
        'sets up a mapping between the new role and the requested activities'
      );
    });
  });
});
