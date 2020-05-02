const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint | PUT /auth/roles/:roleID', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = roleID => `/auth/roles/${roleID}`;

  unauthenticatedTest('put', url(1101));
  unauthorizedTest('put', url(1101));

  const invalidCases = [
    {
      name: 'with activities not an array',
      data: { name: 'new-role', activities: 'wrong' }
    },
    {
      name: 'with activities where some are not numbers',
      data: { name: 'new-role', activities: [0, 'wrong', 2] }
    },
    {
      name: 'with activities that are not valid',
      data: { name: 'new-role', activities: [1001, 1002, 9001] }
    }
  ];

  describe('when authenticated', () => {
    it('when updating the role that the user belongs to', async () => {
      const data = { activities: [1001] };
      const response = await authenticate()
        .then(api => api.put(url(1101), data))
        .then(res => res);

      expect(response.status).toEqual(403);
      expect(response.data).toMatchSnapshot();
    });

    it('with an invalid ID', async () => {
      const response = await authenticate()
        .then(api => api.put(url(9001), {}))
        .then(res => res);

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const response = await authenticate()
          .then(api => api.put(url(1102), situation.data))
          .then(res => res);

        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });
    });

    it('with a valid updated role', async () => {
      const data = { name: 'new name', activities: [1001] };
      const response = await authenticate()
        .then(api => api.put(url(1102), data))
        .then(res => res);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();

      const activities = (
        await db('auth_role_activity_mapping')
          .where({ role_id: 1102 })
          .select('activity_id')
      ).map(activity => activity.activity_id);

      expect(activities).toMatchSnapshot();
    });
  });
});
