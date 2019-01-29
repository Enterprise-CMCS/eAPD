const {
  getFullPath,
  login,
  request,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../../utils.endpoint');

describe('auth activities endpoint | GET /auth/activities', async () => {
  const url = getFullPath('/auth/activities');

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
