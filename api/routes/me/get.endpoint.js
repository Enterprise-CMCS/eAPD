import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} from '../../endpoint-tests/utils.js';

const url = '/me';

describe('/me endpoint | GET', () => {
  const db = getDB();
  const controller = new AbortController();
  let api;
  beforeAll(async () => {
    api = login('all-permissions', controller);
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  unauthenticatedTest('get', url);

  it('when authenticated, with no permissions', async () => {
    // no-permissions is now tied into the actual database
    // so it has to have an affiliation, wy is used because
    // it's the end of the alphabetic list
    const controllerNoPermission = new AbortController();
    const apiNoPermission = login('no-permissions', controllerNoPermission);
    const response = await apiNoPermission.get(url);
    expect(response.status).toEqual(200);
    expect(response.data.states).toEqual({ wy: 'approved' });
    controllerNoPermission.abort();
  });

  describe('user is authenticated, with all permissions', () => {
    let response;
    let user;

    beforeEach(async () => {
      response = await api.get(url);
      user = response.data;
    });

    it('returns a 200 status', () => {
      expect(response.status).toEqual(200);
    });

    it('includes state, role, and activities details for the user', () => {
      expect(user.state).toBeTruthy();
      expect(user.role).toBeTruthy();
      expect(user.activities).toBeTruthy();
    });
  });
});
