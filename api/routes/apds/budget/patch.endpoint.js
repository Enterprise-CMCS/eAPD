const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');


describe(' /apds/budget', () => {
    unauthenticatedTest('get', '/apds/budget');
    unauthorizedTest('get', '/apds/budget');

    it('returns 200', async () => {
      const api = login('all-permissions');
      const response = await api.patch('/apds/budget');
      expect(response.status).toEqual(200);
    });
})
