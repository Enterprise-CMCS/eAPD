const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');


describe('auth/certifications put endpoint', () => {
  describe('PUT /auth/certifications', () => {
    
    const url = '/auth/certifications';

    const payload = {
      "certificationId": "123",
      "affiliationId": "123",
      "stateId": "ak",
      "ffy": "2021"
    };

    unauthenticatedTest('put', url);
    unauthorizedTest('put', url);

    describe('when authenticated as a user with permissions', () => {
      let api;
      beforeAll(async () => {
        api = login();
      });

      it('with no request body', async () => {
        const response = await api.put(url, {});
        
        expect(response.status).toEqual(400);
        expect(response.data).toMatchSnapshot();
      });

      it('with a valid request body', async () => {
        const response = await api.put(url, payload);
        console.log("response", response);
        
        expect(response.status).toEqual(200);
        expect(response.data).toMatchSnapshot();
      });

    });
  });
});
