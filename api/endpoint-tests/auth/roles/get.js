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
          id: 1101,
          activities: [
            'add-users',
            'create-draft',
            'create-roles',
            'delete-users',
            'edit-comments',
            'edit-document',
            'edit-response',
            'edit-roles',
            'submit-clearance',
            'submit-document',
            'submit-federal-response',
            'submit-state-response',
            'view-roles',
            'view-users'
          ]
        },
        {
          name: 'federal analyst',
          id: 1102,
          activities: ['edit-roles']
        },
        {
          name: 'federal leadership',
          id: 1103,
          activities: []
        },
        {
          name: 'federal SME',
          id: 1104,
          activities: []
        },
        {
          name: 'state coordinator',
          id: 1105,
          activities: []
        },
        {
          name: 'state SME',
          id: 1106,
          activities: []
        }
      ],
      'returns an array of known roles'
    );
  });
});
