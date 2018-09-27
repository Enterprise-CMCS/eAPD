const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

const url = id => getFullPath(`/apds/${id}/versions`);

tap.test(
  'apd version withdraw endpoint | DELETE /apds/:id/versions',
  async tests => {
    await db().seed.run();

    unauthenticatedTest('delete', url(1), tests);
    unauthorizedTest('delete', url(1), tests);

    const jar = await login();
    const json = true;

    tests.test('when attempting to withdraw an APD', async test => {
      // Change the APD's status before attempting to withdraw
      // so we can make sure it is changed back.
      await db()('apds')
        .where({ id: 4000 })
        .update({ status: 'not draft' });

      const { response, body } = await request.delete(url(4000), { jar, json });
      const apd = await db()('apds')
        .where({ id: 4000 })
        .select();

      test.equal(response.statusCode, 204, 'sends 204 HTTP status');
      test.notOk(body, 'does not send a body');
      test.equal(apd[0].status, 'draft', 'apd status is draft');
    });
  }
);
