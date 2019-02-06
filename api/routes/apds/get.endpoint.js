const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint', () => {
  describe('List APDs endpoint | GET /apds', async () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = getFullPath('/apds');

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    it('when authenticated as a user without a state', async () => {
      const cookies = await login('all-permissions-no-state', 'password');

      const { response, body } = await request.get(url, { jar: cookies });

      expect(response.statusCode).toEqual(401);
      expect(body).toMatchSnapshot();
    });

    it('when authenticated as a user with a state', async () => {
      const cookies = await login();

      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });

  describe('Get specific APD | GET /apds/:id', async () => {
    const db = getDB();

    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => getFullPath(`/apds/${id}`);

    unauthenticatedTest('get', url(0));
    unauthorizedTest('get', url(0));

    it('when authenticated as a user without a state', async () => {
      const cookies = await login('all-permissions-no-state', 'password');

      const { response, body } = await request.get(url(0), { jar: cookies });

      expect(response.statusCode).toEqual(401);
      expect(body).toMatchSnapshot();
    });

    describe('with authenticated as a user without a state', async () => {
      it('when requesting an APD that does not exist', async () => {
        const cookies = await login();

        const { response, body } = await request.get(url(0), { jar: cookies });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('when requesting an APD that belongs to another state', async () => {
        const cookies = await login();

        const { response, body } = await request.get(url(4001), {
          jar: cookies
        });

        expect(response.statusCode).toEqual(404);
        expect(body).toMatchSnapshot();
      });

      it('when requesting an APD that belongs to their state', async () => {
        const cookies = await login();

        const { response, body } = await request.get(url(4000), {
          jar: cookies
        });

        expect(response.statusCode).toEqual(200);
        expect(body).toMatchSnapshot();
      });
    });
  });
});
