const {
  getDB,
  getFullPath,
  login,
  request,
  unauthenticatedTest
} = require('../../utils.endpoint');

const url = getFullPath('/me');

describe('/me endpoint | GET', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  unauthenticatedTest('get', url);

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
