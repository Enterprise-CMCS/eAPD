const {
  getDB,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('auth roles endpoint | DELETE /auth/roles/:roleID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = roleID => getFullPath(`/auth/roles/${roleID}`);

  unauthenticatedTest('delete', url(1001));
  unauthorizedTest('delete', url(1001));

  describe('when authenticated', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with an invalid role ID', async () => {
      const { response, body } = await request.delete(url(9001), {
        jar: cookies
      });
      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('deleting the role that the user belongs to', async () => {
      const { response, body } = await request.delete(url(1101), {
        jar: cookies
      });
      expect(response.statusCode).toEqual(401);
      expect(body).toMatchSnapshot();
    });

    it('deleting a role that the user does not belong to', async () => {
      const { response, body } = await request.delete(url(1102), {
        jar: cookies
      });

      expect(response.statusCode).toEqual(204);
      expect(body).toMatchSnapshot();

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
