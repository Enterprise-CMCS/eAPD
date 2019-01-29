const { request, getFullPath } = require('../../utils.endpoint');

describe('login endpoint | /auth/login', async () => {
  const url = getFullPath('/auth/login');

  it('with no post body at all', async () => {
    const { response } = await request.post(url);
    expect(response.statusCode).toEqual(400);
  });

  it('proper response headers', async () => {
    const { response } = await request.post(url);
    const { headers } = response;

    expect(headers.vary).toEqual('Origin');
    expect(headers['access-control-allow-credentials']).toEqual('true');
  });

  const invalidCases = [
    {
      title: 'with a post body, but no username or password',
      data: {}
    },
    {
      title: 'with a post body, but no username',
      data: { password: 'test-password' }
    },
    {
      title: 'with a post body, but no password',
      data: { username: 'test-username' }
    }
  ];

  invalidCases.forEach(invalidCase => {
    it(`Form body: ${invalidCase.title}`, async () => {
      const { response } = await request.post(url, { form: invalidCase.data });
      expect(response.statusCode).toEqual(400);
    });

    it(`JSON body: ${invalidCase.title}`, async () => {
      const { response } = await request.post(url, { json: invalidCase.data });
      expect(response.statusCode).toEqual(400);
    });
  });

  const badCredentialsCases = [
    {
      title: 'with invalid username, invalid password',
      data: {
        username: 'nobody',
        password: 'nothing'
      }
    },
    {
      title: 'with invalid username, valid password',
      data: {
        username: 'nobody',
        password: 'password'
      }
    },
    {
      title: 'with valid username, invalid password',
      data: {
        username: 'all-permissions-and-state',
        password: 'nothing'
      }
    }
  ];

  badCredentialsCases.forEach(badCredentialsCase => {
    it(`Form body: ${badCredentialsCase.title}`, async () => {
      const { response } = await request.post(url, {
        form: badCredentialsCase.data
      });
      expect(response.statusCode).toEqual(401);
    });

    it(`JSON body: ${badCredentialsCase.title}`, async () => {
      const { response } = await request.post(url, {
        json: badCredentialsCase.data
      });
      expect(response.statusCode).toEqual(401);
    });
  });

  it('Form body: with valid username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      form: { username: 'all-permissions-and-state', password: 'password' },
      json: true
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });

  it('JSON body: with valid username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      json: { username: 'all-permissions-and-state', password: 'password' }
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });

  it('JSON body: with valid (UPPERCASED) username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      json: { username: 'ALL-PERMISSIONS-AND-STATE', password: 'password' }
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });
});
