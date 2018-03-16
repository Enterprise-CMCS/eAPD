const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

tap.test('auth roles endpoint | GET /auth/roles', async getUsersTest => {
  await db().seed.run();

  const url = getFullPath('/auth/roles');

  unauthenticatedTest('get', url, getUsersTest);
  unauthorizedTest('get', url, getUsersTest);

  getUsersTest.test('when authenticated', async validTest => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    body.sort((role1, role2) => role1.id - role2.id);
    body.forEach(role => role.activities.sort());

    validTest.equal(response.statusCode, 200, 'gives a 200 status code');
    validTest.same(
      body,
      [
        {
          name: 'admin',
          id: 1001,
          activities: [
            'add-users',
            'create-roles',
            'delete-roles',
            'delete-users',
            'edit-roles',
            'edit-state',
            'edit-users',
            'view-activities',
            'view-roles',
            'view-state',
            'view-users'
          ]
        },
        {
          name: 'cms-reviewer',
          id: 1002,
          activities: ['edit-roles']
        },
        {
          name: 'state-submitter',
          id: 1003,
          activities: []
        }
      ],
      'returns an array of known roles'
    );
  });
});
