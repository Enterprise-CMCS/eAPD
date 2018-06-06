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
  'apd version create endpoint | POST /apds/:id/versions',
  async tests => {
    await db().seed.run();

    unauthenticatedTest('post', url(1), tests);
    unauthorizedTest('post', url(1), tests);

    const jar = await login();
    const json = true;

    tests.test('when attempting to save non-draft APD', async test => {
      const { response, body } = await request.post(url(4002), { jar, json });
      const versions = await db()('apd_versions').select();

      test.equal(response.statusCode, 400, 'gives a 400 status code');
      test.match(body, { error: 'apd-not-editable' }, 'sends error token');
      test.equal(versions.length, 0, 'no versions is in the database');
    });

    tests.test('when attempting to save a draft APD', async test => {
      const { response, body } = await request.post(url(4000), { jar, json });
      const versions = await db()('apd_versions').select();

      test.equal(response.statusCode, 204);
      test.notOk(body, 'does not send a body');
      test.equal(versions.length, 1, 'one version is in the database');
    });
  }
);
