const {
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../endpoint-tests/utils');

const url = '/users';

const get = (id = '') => login().then(api => api.get(`${url}/${id}`));

describe('users endpoint | GET /users', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const response = await get();

    expect(response.status).toEqual(200);
    expect(
      response.data.sort(({ id: a }, { id: b }) => (a > b ? 1 : -1))
    ).toMatchSnapshot();
  });
});

describe('users endpoint | GET /users/:userID', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', `${url}/some-id`);
  unauthorizedTest('get', `${url}/some-id`);

  describe('when authenticated', () => {
    it('when requesting a non-existant user ID', async () => {
      const response = await get(0);

      expect(response.status).toEqual(404);
      expect(response.data).toMatchSnapshot();
    });

    it('when requesting a valid user ID', async () => {
      const response = await get(2000);

      expect(response.status).toEqual(200);
      expect(response.data).toMatchSnapshot();
    });
  });
});
