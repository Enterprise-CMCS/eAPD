const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');


describe('auth/certifications delete endpoint', () => {  
  describe('DELETE /auth/certifications', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = '/auth/certifications'

    unauthenticatedTest('get', url);
    unauthorizedTest('get', url);

    describe('when authenticated as a user with permission', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

      it('valid request', async () => {
        const response = await api.delete(url);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });

    });
  });
});
