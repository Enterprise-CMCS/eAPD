const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | GET /apds', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = getFullPath('/apds');

  unauthenticatedTest('get', url);
  unauthorizedTest('get', url);

  it('when authenticated as a user without a state', async () => {
    const cookies = await login('all-permissions-no-state', 'password');

    const { response, body } = await request.get(url, { jar: cookies });

    expect(response.statusCode).toEqual(401);
    expect(body).toMatchSnapshot();
  });

  it('when authenticated as a user with a state', async () => {
    const cookies = await login();

    const { response, body } = await request.get(url, {
      jar: cookies,
      json: true
    });

    expect(response.statusCode).toEqual(200);
    expect(body).toMatchSnapshot();
  });
});
