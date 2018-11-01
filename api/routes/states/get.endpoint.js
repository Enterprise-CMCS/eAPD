const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

describe('states endpoint | GET /states', async () => {
  const url = getFullPath('/states');

  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

  it('when authenticated as a user without an associated state', async () => {
    const cookies = await login('all-permissions-no-state', 'password');
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    expect(response.statusCode).toEqual(401);
    expect(body).toMatchSnapshot();
  });

  it('when authenticated as a user with an associated state', async () => {
    const cookies = await login();
    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    expect(response.statusCode).toEqual(200);
    expect(body).toMatchSnapshot();
  });
});

describe('states/:id endpoint | GET /states/:id', async () => {
  const url = getFullPath('/states/mn');

  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

  describe('when authenticated as a user with permission', async () => {
    let cookies;
    beforeAll(async () => {
      cookies = await login();
    });

    it('with a non-existant state ID', async () => {
      const { response, body } = await request.get(
        getFullPath('/states/baloney'),
        {
          jar: cookies,
          json: true
        }
      );

      expect(response.statusCode).toEqual(404);
      expect(body).toMatchSnapshot();
    });

    it('with a real state ID', async () => {
      const { response, body } = await request.get(url, {
        jar: cookies,
        json: true
      });

      expect(response.statusCode).toEqual(200);
      expect(body).toMatchSnapshot();
    });
  });
});
