const {
  getDB,
  login,
  unauthenticatedTest
} = require('../../endpoint-tests/utils');
const { states } = require('../../util/states');
const { activities } = require('../../util/roles');

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

  describe('user is authenticated, with all permissions', () => {
    let api;
    let response;
    let user;

    beforeEach(async () => {
      api = login('all-permissions');
      response = await api.get(url);
      user = response.data;
    });

    it('returns a 200 status', () => {
      expect(response.status).toEqual(200);
    });

    it('returns permissions for all US states and territories', () => {
      const permissionStatesCount = Object.keys(user.permissions).length;
      expect(permissionStatesCount).toEqual(states.length);
    });

    it('lists the permissions for individual states', () => {
      const permissionsCount = user.permissions.fl.length;
      expect(permissionsCount).toEqual(Object.keys(activities).length);
    });

    it('includes state, role, and activities details for the user', () => {
      expect(user.state).toBeTruthy();
      expect(user.role).toBeTruthy();
      expect(user.activities).toBeTruthy();
    });
  });
});
