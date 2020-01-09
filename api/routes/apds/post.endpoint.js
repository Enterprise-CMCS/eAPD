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

    // The updated date is based on when the APD is saved. Rather than figure
    // out something fancy with the snapshots, just pull out the date and test
    // it with a regex.
    const { updated } = body;
    delete body.updated;

    expect(updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(body).toMatchSnapshot();
  });
});
