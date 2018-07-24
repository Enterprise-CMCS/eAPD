const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../utils');

const url = getFullPath('/me');

tap.test('own-info endpoint | GET /me', async meTests => {
  await db().seed.run();

  unauthenticatedTest('get', url, meTests);

  meTests.test('when authenticated', async test => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    body.activities.sort();

    test.equal(response.statusCode, 200, 'gives a 200 status code');
    test.match(
      body,
      {
        id: 2000,
        username: 'all-permissions-and-state',
        role: 'admin',
        state: { id: 'mn', name: 'Minnesota' },
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
          'view-document',
          'view-roles',
          'view-users'
        ]
      },
      'sends back the logged-in user'
    );
  });
});
