const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint | POST /auth/roles', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = '/auth/roles';

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

  describe('when authenticated', () => {
    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const response = await login().then(api =>
          api.post(url, situation.body)
        );

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });
    });

    it('with a valid new role', async () => {
      const data = { name: 'new-role', activities: [1001, 1002] };
      const response = await login().then(api => api.post(url, data));

      expect(response.status).toEqual(201);
      expect(response.data).toMatchSnapshot();

      const role = await db('auth_roles')
        .where({ name: 'new-role' })
        .first();

      expect(role).toBeTruthy();

      const activities = (
        await db('auth_role_activity_mapping')
          .where({ role_id: role.id })
          .select('activity_id')
      ).map(activity => activity.activity_id);
      activities.sort();

      expect(activities).toMatchSnapshot();
    });

    it('with a valid inactive new role', async () => {
      const data = {
        name: 'inactive-role',
        isActive: false,
        activities: [1001, 1002]
      };
      const response = await login().then(api => api.post(url, data));

      expect(response.status).toEqual(201);
      expect(response.data).toMatchSnapshot();

      const role = await db('auth_roles')
        .where({ name: 'inactive-role', isActive: false })
        .first();

      expect(role).toBeTruthy();

      const activities = (
        await db('auth_role_activity_mapping')
          .where({ role_id: role.id })
          .select('activity_id')
      ).map(activity => activity.activity_id);
      activities.sort();

      expect(activities).toMatchSnapshot();
    });
  });
});
