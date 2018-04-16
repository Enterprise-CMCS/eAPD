const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils');

tap.test(
  'APD activity goals endpoint | PUT /activities/:id/goals',
  async putGoalsTest => {
    const url = activityID => getFullPath(`/activities/${activityID}/goals`);
    await db().seed.run();

    unauthenticatedTest('put', url(1), putGoalsTest);

    putGoalsTest.test(
      'when authenticated as a user with permission',
      async authenticated => {
        const cookies = await login('user2@email', 'something');

        authenticated.test(
          'with a non-existant activity ID',
          async invalidTest => {
            const { response, body } = await request.put(url(9000), {
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
          'with goals that are not valid',
          async invalidTest => {
            const { response, body } = await request.put(url(4100), {
              jar: cookies,
              json: [
                {
                  description: 'new goal 1',
                  objectives: ['o1', 'o2']
                },
                {
                  lacksDescription: 'this one should not come back',
                  objectives: ['o3']
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
              { action: 'update-activity', error: 'invalid-goals' },
              'sends back an error token'
            );
          }
        );

        authenticated.test(
          'with an array of goals with objectives',
          async validTest => {
            const { response, body } = await request.put(url(4100), {
              jar: cookies,
              json: true,
              body: [
                {
                  description: 'new goal 1',
                  objectives: ['o1', 'o2']
                }
              ]
            });

            validTest.equal(
              response.statusCode,
              200,
              'gives a 200 status code'
            );

            body.goals.forEach(goal => goal.objectives.sort());
            validTest.match(
              body,
              {
                id: 4100,
                name: 'Find Success',
                description: 'Some text goes here',
                approaches: [],
                expenses: [],
                goals: [
                  {
                    description: 'new goal 1',
                    objectives: ['o1', 'o2']
                  }
                ],
                schedule: []
              },
              'sends back the updated activity object'
            );
          }
        );
      }
    );
  }
);
