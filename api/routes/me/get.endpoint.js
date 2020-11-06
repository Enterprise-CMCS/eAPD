const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');

const url = '/me';

describe('/me endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

  it('when authenticated, with no permissions', async () => {
    const api = login('no-permissions');
    const response = await api.get(url);

    expect(response.status).toEqual(200);
    expect(response.data.permissions).toEqual({});
    expect(response.data.states).toEqual([]);
  });

  it('when authenticated, with all permissions', async () => {
    const api = login('all-permissions');
    const response = await api.get(url);

    expect(response.status).toEqual(200);
    const permissionStatesCount = Object.keys(response.data.permissions).length;
    expect(permissionStatesCount).toEqual(56);
    const permissionsCount = response.data.permissions.fl.length
    expect(permissionsCount).toEqual(14);
    expect(response.data.states.length).toEqual(56);
  });
});
