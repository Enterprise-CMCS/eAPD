const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

describe('APD endpoint', () => {
  describe('List APDs endpoint | GET /apds', () => {
    const db = getDB();
    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = '/apds';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    it('when authenticated as a user without a state', async () => {
      const response = await login(
        'all-permissions-no-state',
        'password'
      )
        .then(api => api.get(url));

      expect(response.status).toEqual(401);
      expect(response.data).toMatchSnapshot();
    });

    it('when authenticated as a user with a state', async () => {
      const response = await login()
        .then(api => api.get(url));

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('Get specific APD | GET /apds/:id', () => {
    const db = getDB();

    beforeAll(() => db.seed.run());
    afterAll(() => db.destroy());

    const url = id => `/apds/${id}`;

    unauthenticatedTest('get', url(0));
    unauthorizedTest('get', url(0));

    it('when authenticated as a user without a state', async () => {
      const response = await login(
        'all-permissions-no-state',
        'password'
      )
        .then(api => api.get(url(0)));

      expect(response.status).toEqual(401);
      expect(response.data).toMatchSnapshot();
    });

    describe('with authenticated as a user with a state', () => {
      let api;
      beforeAll(async () => {
        api = await login();
      });

      it('when requesting an APD that does not exist', async () => {
        const response = await api.get(url(0));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('when requesting an APD that belongs to another state', async () => {
        const response = await api.get(url(4001));

        expect(response.status).toEqual(404);
        expect(response.data).toMatchSnapshot();
      });

      it('when requesting an APD that belongs to their state', async () => {
        const response = await api.get(url(4000));

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
