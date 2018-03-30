const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

const url = userID => getFullPath(`/users/${userID}`);

tap.test('users endpoint | DELETE /users/:userID', async getUserTest => {
  await db().seed.run();

  unauthenticatedTest('delete', url(0), getUserTest);
  unauthorizedTest('delete', url(0), getUserTest);

  getUserTest.test('when authenticated', async authenticatedTests => {
    const cookies = await login();
    const del = id =>
      request.delete(url(id), {
        jar: cookies,
        json: true
      });

    authenticatedTests.test(
      'when sending a non-numeric ID',
      async invalidTest => {
        const { response, body } = await del('abc');

        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.notOk(body, 'does not send a body');
      }
    );

    authenticatedTests.test(
      'when deleting a non-existant user ID',
      async invalidTest => {
        const { response, body } = await del(0);

        invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
        invalidTest.notOk(body, 'does not send a body');
      }
    );

    authenticatedTests.test(
      'when attempting to delete self',
      async invalidTest => {
        const { response, body } = await del(2000);

        invalidTest.equal(response.statusCode, 403, 'gives a 403 status code');
        invalidTest.notOk(body, 'does not send a body');
      }
    );

    authenticatedTests.test(
      'when deleting a valid user ID',
      async validTest => {
        const { response, body } = await del(2001);

        validTest.equal(response.statusCode, 204, 'gives a 204 status code');
        validTest.notOk(body, 'does not send a body');
      }
    );
  });
});
