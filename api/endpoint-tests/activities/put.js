const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../utils');

tap.test(
  'APD activities endpoint | PUT /activities/:id',
  async putActivityTest => {
    const url = getFullPath('/activities');
    await db().seed.run();

    unauthenticatedTest('put', `${url}/1`, putActivityTest);

    putActivityTest.test(
      'when authenticated as a user with permission',
      async authenticated => {
        const cookies = await login('user2@email', 'something');

        authenticated.test(
          'with a non-existant activity ID',
          async invalidTest => {
            const { response, body } = await request.put(`${url}/9000`, {
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
          `with an activity on an APD in a state other than the user's state`,
          async invalidTest => {
            const { response, body } = await request.put(`${url}/4110`, {
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
            const { response, body } = await request.put(`${url}/4100`, {
              jar: cookies,
              json: {
                name: 'My Second Activity'
              }
            });

            invalidTest.equal(
              response.statusCode,
              400,
              'gives a 400 status code'
            );
            invalidTest.same(
              body,
              { error: 'update-activity-name-exists' },
              'sends back an error token'
            );
          }
        );

        authenticated.test('with an empty activity name', async invalidTest => {
          const { response, body } = await request.put(`${url}/4100`, {
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
            { error: 'update-activity-invalid-name' },
            'sends back an error token'
          );
        });

        authenticated.test('with a valid activity', async validTest => {
          const { response, body } = await request.put(`${url}/4100`, {
            jar: cookies,
            json: {
              name: 'updated name',
              description: 'updated description'
            }
          });

          validTest.equal(response.statusCode, 200, 'gives a 200 status code');
          validTest.same(
            body,
            {
              id: 4100,
              name: 'updated name',
              description: 'updated description',
              approaches: [],
              expenses: [],
              goals: [
                {
                  description: 'Be a super successful artist',
                  objectives: [
                    'Paint a pretty picture',
                    'Paint a confusing picture',
                    'Paint an offensive picture',
                    '...Profit'
                  ]
                },
                {
                  description: 'Win a Nobel prize for physics',
                  objectives: [
                    'Discover a new particle',
                    'Lie about the Moonmen'
                  ]
                },
                {
                  description: 'Go on Ellen',
                  objectives: ['Learn to dance', 'Bring audience gifts']
                }
              ]
            },
            'sends back the updated activity object'
          );
        });
      }
    );
  }
);
