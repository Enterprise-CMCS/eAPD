import {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';

const url = '/users';
const controller = new AbortController();

const get = (id = '') => {
  const api = login(null, controller);
  return api.get(`${url}/${id}`);
};

describe('users endpoint', () => {
  const db = getDB();
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
    controller.abort();
  });

  describe('users endpoint | GET /users/:userID', () => {
    unauthenticatedTest('get', `${url}/some-id`);
    unauthorizedTest('get', `${url}/some-id`);

    describe('when authenticated', () => {
      it('when requesting a non-existant user ID', async () => {
        const response = await get(0);
        expect(response.status).toEqual(404);
      });

      it('when requesting a valid user ID', async () => {
        const response = await get(2000);
        expect(response.status).toEqual(200);
      });
    });
  });
});
