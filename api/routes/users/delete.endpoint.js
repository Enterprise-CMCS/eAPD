const {
  authenticate,
  getDB,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

const url = userID => `/users/${userID}`;

describe('users endpoint | DELETE /users/:userID', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('delete', url(0));
  unauthorizedTest('delete', url(0));

  describe('when authenticated', () => {
    const del = id => authenticate()
      .then(api => api.delete(url(id)))
      .then(res => res);

    it('when sending a non-numeric ID', async () => {
      const response = await del('abc');

      expect(response.status).toEqual(400);
      expect(response.data).toMatchSnapshot();
    });

    it('when deleting a non-existant user ID', async () => {
      const response = await del(0);

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    it('when attempting to delete self', async () => {
      const response = await del(2000);

      expect(response.status).toEqual(403);
      expect(response.data).toMatchSnapshot();
    });

    it('when deleting a valid user ID', async () => {
      const response = await del(2001);

      expect(response.status).toEqual(204);
      expect(response.data).toMatchSnapshot();
    });
  });
});
