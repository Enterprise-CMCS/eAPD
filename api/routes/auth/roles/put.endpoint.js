const {
  getDB,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('auth roles endpoint | PUT /auth/roles/:roleID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = roleID => getFullPath(`/auth/roles/${roleID}`);

  unauthenticatedTest('put', url(1101));
  unauthorizedTest('put', url(1101));

  const invalidCases = [
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

    it('when updating the role that the user belongs to', async () => {
      const { response, body } = await request.put(url(1101), {
        jar: cookies,
        json: { activities: [1001] }
      });
      expect(response.statusCode).toEqual(403);
      expect(body).toMatchSnapshot();
    });

    it('with an invalid ID', async () => {
      const { response, body } = await request.put(url(9001), {
        jar: cookies,
        json: {}
      });
      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    invalidCases.forEach(situation => {
      it(situation.name, async () => {
        const { response, body } = await request.put(url(1102), {
          jar: cookies,
          json: situation.body || true
        });
        expect(response.statusCode).toEqual(400);
        expect(body).toMatchSnapshot();
      });
    });

    it('with a valid updated role', async () => {
      const { response, body } = await request.put(url(1102), {
        jar: cookies,
        json: { name: 'new name', activities: [1001] }
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();

      const activities = await db('auth_role_activity_mapping')
        .where({ role_id: 1102 })
        .select('activity_id')
        .map(activity => activity.activity_id);

      expect(activities).toMatchSnapshot();
    });
  });
});
