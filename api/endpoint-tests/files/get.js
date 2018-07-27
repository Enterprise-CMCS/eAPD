const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../utils');

const url = id => getFullPath(`/files/${id}`);

const get = async id => {
  const jar = await login();
  return request.get(url(id), { jar });
};

tap.test('files endpoint | GET /files/:fileID', async endpointTests => {
  await db().seed.run();

  unauthenticatedTest('get', url(3), endpointTests);

  endpointTests.test('when authenticated', async tests => {
    tests.test('with an invalid ID', async test => {
      const { response, body } = await get('hello');

      test.equal(response.statusCode, 400, 'gives a 400 status code');
      test.notOk(body, 'does not send a body');
    });

    tests.test('with a non-existant file ID', async test => {
      const { response, body } = await get(3);

      test.equal(response.statusCode, 404, 'gives a 404 status code');
      test.notOk(body, 'does not send a body');
    });

    tests.test(
      'with an existant file ID, but file does not exist in the store',
      async test => {
        const { response, body } = await get(5004);
        test.equal(response.statusCode, 404, 'gives a 404 status code');
        test.notOk(body, 'does not send a body');
      }
    );

    tests.test(
      'with an existant file ID, but without access',
      async accessTests => {
        accessTests.test(
          'file is attached to inaccessible activity',
          async test => {
            const { response, body } = await get(5001);

            test.equal(response.statusCode, 404, 'gives a 404 status code');
            test.notOk(body, 'does not send a body');
          }
        );

        accessTests.test(
          'file is attached to inaccessible contractor',
          async test => {
            const { response, body } = await get(5003);

            test.equal(response.statusCode, 404, 'gives a 404 status code');
            test.notOk(body, 'does not send a body');
          }
        );
      }
    );

    tests.test(
      'with an existant file ID, and with access',
      async accessTests => {
        accessTests.test(
          'file is attached to accessible activity',
          async test => {
            const { response, body } = await get(5000);

            test.equal(response.statusCode, 200, 'gives a 200 status code');
            test.equal(
              body,
              'hello, this is downloaded',
              'downloads the expected file'
            );
          }
        );

        accessTests.test(
          'file is attached to accessible contractor',
          async test => {
            const { response, body } = await get(5002);

            test.equal(response.statusCode, 200, 'gives a 200 status code');
            test.equal(
              body,
              'hello, this is downloaded',
              'downloads the expected file'
            );
          }
        );
      }
    );
  });
});
