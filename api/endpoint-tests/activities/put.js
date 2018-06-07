const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../utils');

tap.test(
  'APD activities endpoint | PUT /activities/:id',
  async putActivityTest => {
    const url = getFullPath('/activities');
    await db().seed.run();

    unauthenticatedTest('put', `${url}/1`, putActivityTest);
    unauthorizedTest('put', `${url}/1`, putActivityTest);

    putActivityTest.test(
      'when authenticated as a user with permission',
      async authenticated => {
        const cookies = await login();

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
              { action: 'update-activity', error: 'activity-name-exists' },
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
            { action: 'update-activity', error: 'activity-name-invalid' },
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
              alternatives: null,
              contractorResources: [],
              costAllocationNarrative: {
                methodology: null,
                otherSources: null
              },
              costAllocation: [],
              expenses: [],
              goals: [
                {
                  id: 4200,
                  description: 'Be a super successful artist',
                  objective: 'Paint a pretty picture'
                },
                {
                  id: 4201,
                  description: 'Win a Nobel prize for physics',
                  objective: 'Discover a new particle'
                },
                {
                  id: 4202,
                  description: 'Go on Ellen',
                  objective: 'Learn to dance'
                }
              ],
              schedule: [],
              standardsAndConditions: null,
              summary: null,
              fundingSource: null,
              statePersonnel: []
            },
            'sends back the updated activity object'
          );
        });
      }
    );
  }
);
