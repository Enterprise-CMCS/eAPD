import { jest } from '@jest/globals';

import {
  getDB,
  setupDB,
  teardownDB,
  apiAsFedAdmin,
  apiAsStateAdmin,
  unauthenticatedTest,
  unauthorizedTest
} from '../../endpoint-tests/utils.js';

// using state AK because it's the first in the affiliations
// list so it will be the first affiliation loaded into the
// user, change once user is set
describe('Affiliations endpoint | GET', () => {
  jest.setTimeout(30000);
  const db = getDB();
  const api = apiAsStateAdmin;
  beforeAll(async () => {
    await setupDB(db);
  });
  afterAll(async () => {
    await teardownDB(db);
  });

  describe('GET /states/:stateId/affiliations', () => {
    unauthenticatedTest('get', '/states/na/affiliations');
    unauthorizedTest('get', '/states/na/affiliations');

    it('returns 200', async () => {
      const response = await api.get('/states/na/affiliations');
      expect(response.status).toEqual(200);
    });
    // Figure this out when we have the
    it('returns 200 for the "federal" state', async () => {
      const response = await apiAsFedAdmin.get('/states/fd/affiliations');
      expect(response.status).toEqual(200);
    });
  });

  describe('GET /states/:stateId/affiliations/:id', () => {
    unauthenticatedTest('get', '/states/na/affiliations/4000');
    unauthorizedTest('get', '/states/na/affiliations/4000');

    it('returns 200', async () => {
      const response = await api.get('/states/na/affiliations/4000');
      expect(response.status).toEqual(200);
    });

    it('returns 404', async () => {
      const response = await api.get('/states/na/affiliations/9000');
      expect(response.status).toEqual(404);
    });
  });

  describe('GET /affiliations/me', () => {
    unauthenticatedTest('get', '/affiliations/me');
    // usually there would be an unauthorized test here, but this endpoint is
    // implicitly authorized because it is about the current user.

    it('returns 200', async () => {
      const response = await api.get('/affiliations/me');
      expect(response.status).toEqual(200);
    });
  });
});
