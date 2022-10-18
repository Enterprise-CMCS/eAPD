const {
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe(' /apds/submissions', () => {
  unauthenticatedTest('get', '/apds/submissions');
  unauthorizedTest('get', '/apds/submissions');

  it('returns 200', async () => {
    const api = login('all-permissions');
    const response = await api.get('/apds/submissions');
    expect(response.status).toEqual(200);
  });
});
