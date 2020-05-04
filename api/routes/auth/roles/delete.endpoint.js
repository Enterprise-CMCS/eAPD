const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint | DELETE /auth/roles/:roleID', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = roleID => `/auth/roles/${roleID}`;

  unauthenticatedTest('delete', url(1001));
  unauthorizedTest('delete', url(1001));

  describe('when authenticated', () => {
    it('with an invalid role ID', async () => {
      const response = await login()
        .then(api => api.delete(url(9001)));

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    it('deleting the role that the user belongs to', async () => {
      const response = await login()
        .then(api => api.delete(url(1101)));

      expect(response.status).toEqual(401);
      expect(response.data).toMatchSnapshot();
    });

    it('deleting a role that the user does not belong to', async () => {
      const response = await login()
        .then(api => api.delete(url(1102)));

      expect(response.status).toEqual(204);
      expect(response.data).toMatchSnapshot();

      const role = await db('auth_roles')
        .where({ id: 1102 })
        .first();
      const mappings = await db('auth_role_activity_mapping')
        .where({ role_id: 1102 })
        .select('*');

      expect(role).toBeFalsy();

      expect(mappings).toMatchSnapshot();
    });
  });
});
