const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

const url = getFullPath('/users');

describe('users endpoint | GET /users', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated', async () => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    expect(response.statusCode).toEqual(200);
    expect(body).toMatchSnapshot();
  });
});

describe('users endpoint | GET /users/:userID', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', `${url}/some-id`);
  unauthorizedTest('get', `${url}/some-id`);

  describe('when authenticated', async () => {
    it('when requesting a non-existant user ID', async () => {
      const cookies = await login();
      const { response, body } = await request.get(`${url}/0`, {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('when requesting a valid user ID', async () => {
      const cookies = await login();
      const { response, body } = await request.get(`${url}/2000`, {
        jar: cookies,
        json: true
      });
      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
