const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');


describe('auth/certifications put endpoint', () => {
  describe('PUT /auth/certifications', () => {


    const url = '/auth/certifications'

    unauthenticatedTest('put', url);
    unauthorizedTest('put', url);

    describe('when authenticated as a user with permissions', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

      it('valid request', async () => {
        const response = await api.put(url);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });

    });
  });
});
