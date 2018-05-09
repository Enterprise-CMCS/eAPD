const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

tap.test('APD endpoint | PUT /apds/:id', async putAPDTest => {
  const url = apdID => getFullPath(`/apds/${apdID}`);
  await db().seed.run();

  unauthenticatedTest('put', url(1), putAPDTest);
  unauthorizedTest('put', url(1), putAPDTest);

  putAPDTest.test(
    'when authenticated as a user with permission',
    async authenticated => {
      const cookies = await login();

      authenticated.test('with a non-existant apd ID', async invalidTest => {
        const { response, body } = await request.put(url(9000), {
          jar: cookies,
          json: true
        });

        invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
        invalidTest.notOk(body, 'does not send a body');
      });

      authenticated.test(
        `with an APD in a state other than the user's state`,
        async invalidTest => {
          const { response, body } = await request.put(url(4001), {
            jar: cookies,
            json: true
          });

          invalidTest.equal(
            response.statusCode,
            404,
            'gives a 404 status code'
          );
          invalidTest.notOk(body, 'does not send a body');
        }
      );

      authenticated.test('with a valid update', async validTest => {
        const { response, body } = await request.put(url(4000), {
          jar: cookies,
          json: {
            status: 'new status',
            period: 'new period'
          }
        });

        validTest.equal(response.statusCode, 200, 'gives a 200 status code');
        validTest.match(
          body,
          {
            id: 4000,
            period: 'new period',
            status: 'new status',
            state_id: 'mn'
          },
          'sends back the updated APD object'
        );
      });
    }
  );
});
