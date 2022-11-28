import { login, api } from '../../endpoint-tests/utils';

describe('Document endpoints', () => {
  describe('Get help doc | GET /docs/account-registration', () => {
    const url = '/docs/account-registration';

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

  describe('Get help doc | GET /docs/system-access', () => {
    const url = '/docs/system-access';

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
