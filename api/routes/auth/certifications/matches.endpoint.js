const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth/certifications/matches endpoints', () => {
  describe('Get matches by status | GET /auth/certifications/matches/:status?', () => {

    const url = (status) => `/auth/certifications/matches/${status}`;

    describe('when authenticated as a user with permission', () => {
      let api;

      beforeAll(async () => {
        api = login();
      });

      unauthenticatedTest('get', url(0));
      unauthorizedTest('get', url(0));

      it('with an invalid request', async () => {
        const response = await api.get(
          url('null')
        );

        expect(response.status).toEqual(400);
      });

      it('with a valid request', async () => {
        const response = await api.get(
          url('pending')
        );

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });
    });
  });
})
