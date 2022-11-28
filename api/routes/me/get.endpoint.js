import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest
} from '../../endpoint-tests/utils';

const url = '/me';

describe('/me endpoint | GET', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  unauthenticatedTest('get', url);

  it('when authenticated, with no permissions', async () => {
    // no-permissions is now tied into the actual database
    // so it has to have an affiliation, wy is used because
    // it's the end of the alphabetic list
    const api = login('no-permissions');
    const response = await api.get(url);
    expect(response.status).toEqual(200);
    expect(response.data.states).toEqual({ wy: 'approved' });
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

    it('includes state, role, and activities details for the user', () => {
      expect(user.state).toBeTruthy();
      expect(user.role).toBeTruthy();
      expect(user.activities).toBeTruthy();
    });
  });
});
