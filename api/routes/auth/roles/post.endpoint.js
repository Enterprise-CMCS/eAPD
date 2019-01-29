const {
  getDB,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('auth roles endpoint | POST /auth/roles', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = getFullPath('/auth/roles');

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with no name',
      body: {}
    },
    {
      name: 'with an existing name',
      body: { name: 'admin' }
    },
    {
      name: 'with activities not an array',
      body: { name: 'new-role', activities: 'wrong' }
    },
    {
      name: 'with activities where some are not numbers',
      body: { name: 'new-role', activities: [0, 'wrong', 2] }
    },
    {
      name: 'with activities that are not valid',
      body: { name: 'new-role', activities: [1001, 1002, 9001] }
    }
  ];

  describe('when authenticated', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const { response, body } = await request.post(url, {
          jar: cookies,
          json: situation.body || true
        });
        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    it('with a valid new role', async () => {
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { name: 'new-role', activities: [1001, 1002] }
      });

      expect(response.statusCode).toEqual(201);
      expect(body).toMatchSnapshot();

      const role = await db('auth_roles')
        .where({ name: 'new-role' })
        .first();

      expect(role).toBeTruthy();

      const activities = await db('auth_role_activity_mapping')
        .where({ role_id: role.id })
        .select('activity_id')
        .map(activity => activity.activity_id);
      activities.sort();

      expect(activities).toMatchSnapshot();
    });
  });
});
