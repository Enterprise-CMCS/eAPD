const jwt = require('jsonwebtoken');
const { request, getFullPath } = require('../../utils.endpoint');

describe('login nonce endpoint | /auth/login/nonce', () => {
  const url = getFullPath('/auth/login/nonce');

  it('with no username', async () => {
    const {
      response: { statusCode }
    } = await request.post(url);
    expect(statusCode).toEqual(400);
  });

  it('with a username', async () => {
    const {
      response: { statusCode },
      body
    } = await request.post(url, { json: { username: 'test user' } });
    expect(statusCode).toEqual(200);

    const token = jwt.decode(body.nonce);

    expect(body.nonce).toMatch(/[^.]+\.[^.]+\.[^.]+/i);
    expect(token).toMatchObject({ username: 'test user' });
    expect(token.exp).toEqual(token.iat + 3);
  });
});

describe('login endpoint | /auth/login', () => {
  const nonceUrl = getFullPath('/auth/login/nonce');
  const nonceForUsername = async username => {
    const {
      body: { nonce }
    } = await request.post(nonceUrl, { json: { username } });
    return nonce;
  };

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
      title: 'with malformatted nonce',
      data: () => ({
        username: 'something or other',
        password: 'nothing'
      })
    },
    {
      title: 'with invalid nonce signature',
      data: async () => {
        const nonce = await nonceForUsername('username');
        return {
          username: nonce.substr(0, nonce.length - 1),
          password: 'anything'
        };
      }
    },
    {
      title: 'with expired nonce',
      data: async () => {
        const nonce = await nonceForUsername('username');
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              username: nonce.substr(0, nonce.length - 1),
              password: 'anything'
            });
          }, 3010);
        });
      }
    },
    {
      title: 'with nonce for invalid username, valid password',
      data: async () => ({
        username: await nonceForUsername('nobody'),
        password: 'password'
      })
    },
    {
      title: 'with nonce for valid username, invalid password',
      data: async () => ({
        username: await nonceForUsername('all-permissions-and-state'),
        password: 'nothing'
      })
    }
  ];

  badCredentialsCases.forEach(badCredentialsCase => {
    it(`Form body: ${badCredentialsCase.title}`, async () => {
      const { response } = await request.post(url, {
        form: await badCredentialsCase.data()
      });
      expect(response.statusCode).toEqual(401);
    });

    it(`JSON body: ${badCredentialsCase.title}`, async () => {
      const { response } = await request.post(url, {
        json: await badCredentialsCase.data()
      });
      expect(response.statusCode).toEqual(401);
    });
  });

  it('Form body: with valid username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      form: {
        username: await nonceForUsername('all-permissions-and-state'),
        password: 'password'
      },
      json: true
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('token=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });

  it('JSON body: with valid username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      json: {
        username: await nonceForUsername('all-permissions-and-state'),
        password: 'password'
      }
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('token=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });

  it('JSON body: with valid (UPPERCASED) username and valid password', async () => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    const { response, body } = await request.post(url, {
      jar: cookies,
      json: {
        username: await nonceForUsername('ALL-PERMISSIONS-AND-STATE'),
        password: 'password'
      }
    });

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers['set-cookie'].some(
        cookie => cookie.startsWith('token=') && cookie.endsWith('; httponly')
      )
    ).toBeTruthy();
    expect(body).toMatchSnapshot();
  });
});
