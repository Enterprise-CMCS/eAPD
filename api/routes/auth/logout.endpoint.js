const { request, getFullPath } = require('../../utils.endpoint');

describe('logout endpoint | /auth/logout', async () => {
  const url = getFullPath('/auth/logout');

  it('not already logged in', async () => {
    const cookies = request.jar();

    const { response } = await request.get(url, { jar: cookies });

    expect(response.statusCode).toEqual(200);

    // It might be valid for the API to set some header other than
    // the session cookie, but it might also be valid for it to set
    // no headers at all.
    if (response.headers['set-cookie']) {
      expect(
        response.headers['set-cookie'].every(
          cookie => !cookie.startsWith('session=')
        )
      ).toBeTruthy();
    }
  });

  describe('already logged in', async () => {
    const cookies = request.jar();
    cookies.setCookie('session=this-is-my-session', url);

    const { response } = await request.get(url, { jar: cookies });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(
      response.headers['set-cookie'].every(
        cookie => !cookie.startsWith('session=this-is-my-session')
      )
    ).toBeTruthy();
  });
});
