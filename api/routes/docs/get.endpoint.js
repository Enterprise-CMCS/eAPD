const { login, api } = require('../../endpoint-tests/utils');

describe('Document endpoints', () => {
  describe('Get help doc | GET /docs/help', () => {
    const url = '/docs/help';

    it('when authenticated', async () => {
      const authApi = login();

      const response = await authApi.get(url);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });

    it('when not authenticated', async () => {
      const response = await api.get(url);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });
  });
});
