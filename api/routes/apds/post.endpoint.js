const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils.endpoint');

describe('APD endpoint | POST /apds', () => {
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

    // The name is derived from the creation date, so it'll change with every
    // run of this test.  Rather than figure out something fancy with the
    // snapshots, just pull out the name and test it with a regex.

    const { name } = body;
    delete body.name;

    expect(name).toMatch(/MN-\d{4}-\d{2}-\d{2}-HITECH-APD/);
    expect(body).toMatchSnapshot();
  });
});
