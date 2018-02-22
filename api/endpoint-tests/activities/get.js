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
        { id: 1, name: 'view-roles' },
        { id: 2, name: 'create-roles' },
        { id: 3, name: 'edit-roles' },
        { id: 4, name: 'delete-roles' },
        { id: 5, name: 'view-users' },
        { id: 6, name: 'add-users' },
        { id: 7, name: 'view-activities' }
      ],
      'returns an array of activities'
    );
  });
});
