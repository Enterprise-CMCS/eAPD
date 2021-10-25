const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');


describe('auth/certifications put endpoint', () => {
  describe('PUT /auth/certifications', () => {
    
    const url = '/auth/certifications';
    const payload = {
      certificationId: '1',
      certificationFfy: '2021',
      affiliationId: '58',
      stateId: 'ak'
    };

    unauthenticatedTest('put', url);
    unauthorizedTest('put', url);

    describe('when authenticated as a user with permissions', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

      it('valid request', async () => {
        const response = await api.put(url, payload);
        console.log("response", response);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });

    });
  });
});
