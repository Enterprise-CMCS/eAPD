const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

tap.test(
  'APD activity approaches endpoint | PUT /activities/:id/approaches',
  async putGoalsTest => {
    const url = activityID =>
      getFullPath(`/activities/${activityID}/approaches`);
    await db().seed.run();

    unauthenticatedTest('put', url(1), putGoalsTest);
    unauthorizedTest('put', url(1), putGoalsTest);

    putGoalsTest.test(
      'when authenticated as a user with permission',
      async authenticated => {
        const cookies = await login();

        authenticated.test(
          'with a non-existant activity ID',
          async invalidTest => {
            const { response, body } = await request.put(url(1), {
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
            const { response, body } = await request.put(url(4110), {
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
          'with approaches that are invalid',
          async invalidTest => {
            const { response, body } = await request.put(url(4100), {
              jar: cookies,
              json: [
                {
                  description: 'new approach 1',
                  alternatives: 'new alternative 1',
                  explanation: 'new explanation 1'
                },
                {
                  thisOne: 'is invalid',
                  because: 'it does not have',
                  theFields: 'we expect'
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
              { action: 'update-activity', error: 'invalid-approaches' },
              'sends back an error token'
            );
          }
        );

        authenticated.test('with an array of approaches', async validTest => {
          const { response, body } = await request.put(url(4100), {
            jar: cookies,
            json: true,
            body: [
              {
                description: 'new approach 1',
                alternatives: 'new alternative 1',
                explanation: 'new explanation 1'
              }
            ]
          });

          validTest.equal(response.statusCode, 200, 'gives a 200 status code');
          validTest.match(
            body,
            {
              id: 4100,
              name: 'Find Success',
              description: 'Some text goes here',
              approaches: [
                {
                  description: 'new approach 1',
                  alternatives: 'new alternative 1',
                  explanation: 'new explanation 1'
                }
              ],
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
