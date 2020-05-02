const { api, authenticate } = require('../../endpoint-tests/utils');

describe('logout endpoint | /auth/logout', () => {
  const url = '/auth/logout';

  describe('when unauthenticated', () => {
    it('returns 400 status', async () => {
      const response = await api.get(url).then(res => res);

      expect(response.status).toEqual(400);
    });
  });

  describe('when authenticated', () => {
    it('returns 200 status', async () => {
      const response = await authenticate()
        .then(authenticatedClient => authenticatedClient.get(url))
        .then(res => res);

      expect(response.status).toEqual(200);
    });
  });
});
