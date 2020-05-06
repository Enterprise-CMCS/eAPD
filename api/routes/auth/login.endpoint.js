const jwt = require('jsonwebtoken');
const qs = require('querystring');
const { api, buildForm, getDB } = require('../../endpoint-tests/utils');

describe('login nonce endpoint | /auth/login/nonce', () => {
  const url = '/auth/login/nonce';

  it('with no username', async () => {
    const response = await api.post(url);
    expect(response.status).toEqual(400);
  });

  it('with a username', async () => {
    const response = await api
      .post(url, { username: 'test user' });
    expect(response.status).toEqual(200);

    const token = jwt.decode(response.data.nonce);

    expect(response.data.nonce).toMatch(/[^.]+\.[^.]+\.[^.]+/i);
    expect(token).toMatchObject({ username: 'test user' });
    expect(token.exp).toEqual(token.iat + 3);
  });
});

describe('login endpoint | /auth/login', () => {
  const db = getDB();
  beforeAll(() => db.seed.run());
  afterAll(() => db.destroy());

  const nonceUrl = '/auth/login/nonce';
  const nonceForUsername = async username => {
    const response = await api.post(nonceUrl, { username });
    return response.data.nonce;
  };

  const url = '/auth/login';

  it('with no post body at all', async () => {
    const response = await api.post(url);
    expect(response.status).toEqual(400);
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
      const form = buildForm(invalidCase.data);
      const response = await api.post(url, form);
      expect(response.status).toEqual(400);
    });

    it(`JSON body: ${invalidCase.title}`, async () => {
      const response = await api.post(url, invalidCase.data);
      expect(response.status).toEqual(400);
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

  const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  badCredentialsCases.forEach(badCredentialsCase => {
    it(`Form body: ${badCredentialsCase.title}`, async () => {
      const data = await badCredentialsCase.data();
      const form = qs.stringify(data);
      const response = await api.post(url, form, config);
      expect(response.status).toEqual(401);
    });

    it(`JSON body: ${badCredentialsCase.title}`, async () => {
      const response = await api.post(url, await badCredentialsCase.data());
      expect(response.status).toEqual(401);
    });
  });

  it('Form body: with valid username and valid password', async () => {
    const data = {
      username: await nonceForUsername('all-permissions-and-state'),
      password: 'password'
    };

    const response = await api.post(url, qs.stringify(data));

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot({ token: expect.any(String) });
  });

  it('JSON body: with valid username and valid password', async () => {
    const data = {
      username: await nonceForUsername('all-permissions-and-state'),
      password: 'password'
    };

    const response = await api.post(url, data);

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot({ token: expect.any(String) });
  });

  it('JSON body: with valid (UPPERCASED) username and valid password', async () => {
    const data = {
      username: await nonceForUsername('ALL-PERMISSIONS-AND-STATE'),
      password: 'password'
    };

    const response = await api.post(url, data);

    expect(response.status).toEqual(200);
    expect(response.data).toMatchSnapshot({ token: expect.any(String) });
  });
});
