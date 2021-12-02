const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

<<<<<<< HEAD
describe('auth/certifications endpoints', () => {
  describe('GET /auth/certifications', () => {
    const url = '/auth/certifications';
=======

describe('auth/certifications get endpoint', () => {  
  describe('GET /auth/certifications', () => {
    const db = getDB();
    beforeAll(() => setupDB(db));
    afterAll(() => teardownDB(db));

    const url = '/auth/certifications'
>>>>>>> main

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
