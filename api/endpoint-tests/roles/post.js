const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db, request, getFullPath, login
} = require('../utils');

tap.test('roles endpoint | POST /roles', async postRolesTests => {
  const url = getFullPath('/roles');

  const invalidCases = [{
    name: 'with no body'
  }, {
    name: 'with no name',
    body: {}
  }, {
    name: 'with an existing name',
    body: { name: 'admin' }
  }, {
    name: 'with no activities',
    body: { name: 'new-role' }
  }, {
    name: 'with activities not an array',
    body: { name: 'new-role', activities: 'wrong' }
  }, {
    name: 'with activities where some are not numbers',
    body: { name: 'new-role', activities: [0, 'wrong', 2] }
  }, {
    name: 'with activities that are not valid',
    body: { name: 'new-role', activities: [1, 2, 9001] }
  }];

  postRolesTests.test('when unauthenticated', async unauthenticatedTests => {
    [
      ...invalidCases,
      {
        name: 'with a valid body',
        body: { name: 'new-role', activities: [1, 2] }
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
      });
    });
  });

  postRolesTests.test('when authenticated', async authenticatedTests => {
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
          { error: 'add-role-invalid' },
          'sends a token indicating the failure'
        );
      });
    });

    authenticatedTests.test('with a valid new user', async validTest => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { name: 'new-role', activities: [1, 2] }
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(body, 'sends a body');
      validTest.type(body.roleID, 'number', 'sends back a numeric role ID');

      const role = await db()('auth_roles')
        .where({ name: 'new-role' })
        .first();

      validTest.ok(role, 'a role object is inserted into the database');

      const activities = await db()('auth_role_activity_mapping')
        .where({ role_id: role.id })
        .select('activity_id')
        .map(activity => activity.activity_id);

      validTest.same(activities, [1, 2], 'sets up a mapping between the new role and the requested activities');
    });
  });
});
