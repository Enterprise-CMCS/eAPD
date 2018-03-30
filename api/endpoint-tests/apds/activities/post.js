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
            const { response, body } = await request.post(url(4001), {
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
          'when creating a single new activity',
          async singleTests => {
            await db().seed.run();

            singleTests.test(
              'with an activity name that already exists for the APD',
              async invalidTest => {
                const { response, body } = await request.post(url(4000), {
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

            singleTests.test(
              'with an empty activity name',
              async invalidTest => {
                const { response, body } = await request.post(url(4000), {
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
              }
            );

            singleTests.test('with a valid activity', async validTest => {
              const { response, body } = await request.post(url(4000), {
                jar: cookies,
                json: {
                  name: 'new activity name',
                  description:
                    'description is ignored when the activity is created'
                }
              });

              validTest.equal(
                response.statusCode,
                200,
                'gives a 200 status code'
              );
              validTest.match(
                body,
                [
                  {
                    id: 4100,
                    name: 'Find Success'
                  },
                  {
                    id: 4101,
                    name: 'My Second Activity'
                  },
                  {
                    name: 'new activity name'
                  }
                ],
                'sends back all activities, including the new activity object'
              );
              validTest.ok(
                !Number.isNaN(+body[2].id),
                'new activity ID is a number'
              );
            });
          }
        );

        authenticated.test(
          'when sending multiple activities',
          async multipleTests => {
            await db().seed.run();

            multipleTests.test(
              'when an activity has an invalid name',
              async invalidTest => {
                const { response, body } = await request.post(url(4000), {
                  jar: cookies,
                  json: [
                    {
                      name: 'hello'
                    },
                    {
                      name: 1
                    }
                  ]
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
              }
            );

            multipleTests.test('with valid activities', async validTest => {
              const { response, body } = await request.post(url(4000), {
                jar: cookies,
                json: [
                  {
                    name: 'new activity name'
                  },
                  {
                    id: 4101,
                    name: 'activity new name'
                  }
                ]
              });

              validTest.equal(
                response.statusCode,
                200,
                'gives a 200 status code'
              );
              validTest.match(
                body,
                [
                  {
                    id: 4100,
                    name: 'Find Success'
                  },
                  {
                    id: 4101,
                    name: 'activity new name'
                  },
                  {
                    name: 'new activity name'
                  }
                ],
                'sends back all activities, including new and updated activity objects'
              );
              validTest.ok(
                !Number.isNaN(+body[2].id),
                'new activity ID is a number'
              );
            });
          }
        );
      }
    );
  }
);
