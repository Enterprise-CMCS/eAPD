const { api, login } = require('../../endpoint-tests/utils');

describe('logout endpoint | /auth/logout', () => {
  const url = '/auth/logout';

  describe('when unauthenticated', () => {
    it('returns 200 status', async () => {
      const response = await api.get(url);

      expect(response.status).toEqual(200);
    });
  });

  describe('when authenticated', () => {
    it('returns 200 status', async () => {
      const response = await login()
        .then(authenticatedClient => authenticatedClient.get(url));

      expect(response.status).toEqual(200);
    });
  });
});
