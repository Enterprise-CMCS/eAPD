const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | POST /apds', async () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const url = getFullPath(`/apds`);

  unauthenticatedTest('post', url);
  unauthorizedTest('post', url);

  it('when authenticated as a user with permission', async () => {
    const cookies = await login();

    const {
      response: { statusCode },
      body
    } = await request.post(url, {
      jar: cookies,
      json: true
    });

    expect(statusCode).toEqual(200);
    expect(body).toMatchSnapshot();
  });
});
