const { request, getFullPath } = require('../../utils.endpoint');

describe('logout endpoint | /auth/logout', () => {
  const url = getFullPath('/auth/logout');

  it('not already logged in', async () => {
    const cookies = request.jar();

    const { response } = await request.get(url, { jar: cookies });

    expect(response.statusCode).toEqual(200);

    // It might be valid for the API to set some header other than
    // the session cookie
    expect(
      response.headers['set-cookie']
        .filter(cookie => cookie.startsWith('token='))
        .every(
          cookie =>
            cookie ===
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict; httponly'
        )
    ).toBeTruthy();
  });

  it('already logged in', async () => {
    const cookies = request.jar();
    cookies.setCookie('session=this-is-my-session', url);

    const { response } = await request.get(url, { jar: cookies });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie']
        .filter(cookie => cookie.startsWith('token='))
        .every(
          cookie =>
            cookie ===
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict; httponly'
        )
    ).toBeTruthy();
  });
});
