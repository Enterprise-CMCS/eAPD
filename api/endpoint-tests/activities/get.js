const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { getFullPath, login, request } = require('../utils');

tap.test('activities endpoint | GET /activities', async getUsersTest => {
  const url = getFullPath('/activities');

  getUsersTest.test('when unauthenticated', async unauthenticatedTest => {
    const { response, body } = await request.get(url);
    unauthenticatedTest.equal(
      response.statusCode,
      403,
      'gives a 403 status code'
    );
    unauthenticatedTest.notOk(body, 'does not send a body');
  });

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
        { id: 1009, name: 'view-state' }
      ],
      'returns an array of activities'
    );
  });
});
