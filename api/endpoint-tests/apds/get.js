const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../utils');

tap.test('APD endpoint | GET /apds', async getAPDsTest => {
  const url = getFullPath('/apds');
  await db().seed.run();

  unauthenticatedTest('get', url, getAPDsTest);

  getAPDsTest.test(
    'when authenticated as a user with a state',
    async invalidTest => {
      const cookies = await login();

      const { response, body } = await request.get(url, { jar: cookies });

      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.notOk(body, 'does not send a body');
    }
  );

  getAPDsTest.test(
    'when authenticated as a user with a state',
    async validTest => {
      const cookies = await login('user2@email', 'something');

      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.match(
        body,
        [
          {
            id: 4000,
            status: 'draft',
            state: 'mn',
            programOverview: null,
            narrativeHIE: null,
            narrativeHIT: null,
            narrativeMMIS: null,
            activities: [
              {
                id: 4100,
                name: 'Find Success',
                description: 'Some text goes here',
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
              {
                id: 4101,
                name: 'My Second Activity',
                description: 'More gunk',
                expenses: [],
                goals: []
              }
            ]
          }
        ],
        'sends back the new activity object'
      );
    }
  );
});
