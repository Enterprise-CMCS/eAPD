const { actualVerifyEAPDToken } = require('../../../auth/jwtUtils');

const {
  getDB,
  setupDB,
  teardownDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../endpoint-tests/utils');

describe('auth roles endpoint | GET /auth/roles', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  const url = '/auth/roles';

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const api = login();
    const response = await api.get(url);

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot();
  });
});

describe('state switch endpoint | GET /auth/state/:stateId', () => {
  const db = getDB();
  beforeAll(() => setupDB(db));
  afterAll(() => teardownDB(db));

  const url = '/auth/state';

  unauthenticatedTest('get', `${url}/ak`);
  unauthorizedTest('get', `${url}/ak`);

  it('when authenticated', async () => {
    const api = login('all-permissions');
    const response = await api.get(`${url}/mn`);

    expect(response.status).toEqual(200);
    const claims = await actualVerifyEAPDToken(response.data.jwt);
    expect(claims.state).toMatchSnapshot();
  });
});
