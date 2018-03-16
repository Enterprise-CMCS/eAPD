const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

tap.test(
  'auth activities endpoint | GET /auth/activities',
  async getUsersTest => {
    const url = getFullPath('/auth/activities');

    unauthenticatedTest('get', url, getUsersTest);
    unauthorizedTest('get', url, getUsersTest);

    getUsersTest.test('when authenticated', async validTest => {
      const cookies = await login();
      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      body.sort((activity1, activity2) => activity1.id - activity2.id);

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.same(
        body,
        [
          { id: 1001, name: 'view-roles' },
          { id: 1002, name: 'create-roles' },
          { id: 1003, name: 'edit-roles' },
          { id: 1004, name: 'delete-roles' },
          { id: 1005, name: 'view-users' },
          { id: 1006, name: 'add-users' },
          { id: 1007, name: 'view-activities' },
          { id: 1008, name: 'edit-users' },
          { id: 1009, name: 'view-state' },
          { id: 1010, name: 'edit-state' },
          { id: 1011, name: 'delete-users' }
        ],
        'returns an array of activities'
      );
    });
  }
);
