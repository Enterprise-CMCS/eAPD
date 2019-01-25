const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

const url = userID => getFullPath(`/users/${userID}`);

describe('users endpoint | DELETE /users/:userID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('delete', url(0));
  unauthorizedTest('delete', url(0));

  describe('when authenticated', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });
    const del = id =>
      request.delete(url(id), {
        jar: cookies,
        json: true
      });

    it('when sending a non-numeric ID', async () => {
      const { response, body } = await del('abc');

      expect(response.statusCode).toEqual(400);
      expect(body).toMatchSnapshot();
    });

    it('when deleting a non-existant user ID', async () => {
      const { response, body } = await del(0);

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('when attempting to delete self', async () => {
      const { response, body } = await del(2000);

      expect(response.statusCode).toEqual(403);
      expect(body).toMatchSnapshot();
    });

    it('when deleting a valid user ID', async () => {
      const { response, body } = await del(2001);

      expect(response.statusCode).toEqual(204);
      expect(body).toMatchSnapshot();
    });
  });
});
