const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const getFullPath = require('../utils').getFullPath;
const login = require('../utils').login;
const request = require('../utils').request;

tap.test('roles endpoint | GET /roles', async getUsersTest => {
  const url = getFullPath('/roles');

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

    validTest.equal(response.statusCode, 200, 'gives a 200 status code');
    validTest.same(
      body,
      [{
        name: 'admin',
        id: 1,
        activities: ['view-roles', 'create-roles', 'edit-roles']
      }, {
        name: 'cms-reviewer',
        id: 2,
        activities: ['edit-roles']
      }, {
        name: 'state-submitter',
        id: 3,
        activities: []
      }],
      'returns an array of known roles'
    );
  });
});
