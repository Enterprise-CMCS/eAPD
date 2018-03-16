const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils');

tap.test(
  'APD activities endpoint | POST /apds/:apdID/activities',
  async postActivityTest => {
    const url = apdID => getFullPath(`/apds/${apdID}/activities`);
    await db().seed.run();

    unauthenticatedTest('post', url(1), postActivityTest);

    postActivityTest.test(
      'when authenticated as a user with permission',
      async authenticated => {
        const cookies = await login('user2@email', 'something');

        authenticated.test('with a non-existant APD ID', async invalidTest => {
          const { response, body } = await request.post(url(9000), {
            jar: cookies,
            json: true
          });

          invalidTest.equal(
            response.statusCode,
            404,
            'gives a 404 status code'
          );
          invalidTest.notOk(body, 'does not send a body');
        });

        authenticated.test(
          `with an APD in a state other than the user's state`,
          async invalidTest => {
            const { response, body } = await request.post(url(1001), {
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

        authenticated.test(
          'with an activity name that already exists for the APD',
          async invalidTest => {
            const { response, body } = await request.post(url(1000), {
              jar: cookies,
              json: {
                name: 'Find Success'
              }
            });

            invalidTest.equal(
              response.statusCode,
              400,
              'gives a 400 status code'
            );
            invalidTest.same(
              body,
              { error: 'add-activity-name-exists' },
              'sends back an error token'
            );
          }
        );

        authenticated.test('with an empty activity name', async invalidTest => {
          const { response, body } = await request.post(url(1000), {
            jar: cookies,
            json: {
              name: ''
            }
          });

          invalidTest.equal(
            response.statusCode,
            400,
            'gives a 400 status code'
          );
          invalidTest.same(
            body,
            { error: 'add-activity-invalid-name' },
            'sends back an error token'
          );
        });

        authenticated.test('with a valid activity', async validTest => {
          const { response, body } = await request.post(url(1000), {
            jar: cookies,
            json: {
              name: 'new activity name',
              description: 'description is ignored when the activity is created'
            }
          });

          validTest.equal(response.statusCode, 200, 'gives a 200 status code');
          validTest.match(
            body,
            {
              name: 'new activity name'
            },
            'sends back the new activity object'
          );
          validTest.ok(!Number.isNaN(+body.id), 'new activity ID is a number');
        });
      }
    );
  }
);
