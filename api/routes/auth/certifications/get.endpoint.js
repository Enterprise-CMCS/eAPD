const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth/certifications endpoints', () => {
  describe('GET /auth/certifications', () => {
    const url = '/auth/certifications';

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(() => {
        api = login();
      });

      it('valid request', async () => {
        const response = await api.get(url);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
});
