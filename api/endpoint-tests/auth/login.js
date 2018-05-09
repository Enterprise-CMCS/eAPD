const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { request, getFullPath } = require('../utils');

tap.test('login endpoint | /auth/login', async loginTest => {
  const url = getFullPath('/auth/login');

  loginTest.test('with no post body at all', async invalidTest => {
    const { response } = await request.post(url);
    invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
  });

  loginTest.test('proper response headers', async headerTest => {
    const { response } = await request.post(url);
    const { headers } = response;

    headerTest.equal(headers.vary, 'Origin', 'vary origin');
    headerTest.equal(
      headers['access-control-allow-credentials'],
      'true',
      'allow credentials'
    );
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
    loginTest.test(`Form body: ${invalidCase.title}`, async invalidTest => {
      const { response } = await request.post(url, { form: invalidCase.data });
      invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
    });

    loginTest.test(`JSON body: ${invalidCase.title}`, async invalidTest => {
      const { response } = await request.post(url, { json: invalidCase.data });
      invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
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
    loginTest.test(
      `Form body: ${badCredentialsCase.title}`,
      async invalidTest => {
        const { response } = await request.post(url, {
          form: badCredentialsCase.data
        });
        invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      }
    );

    loginTest.test(
      `JSON body: ${badCredentialsCase.title}`,
      async invalidTest => {
        const { response } = await request.post(url, {
          json: badCredentialsCase.data
        });
        invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      }
    );
  });

  loginTest.test(
    'Form body: with valid username and valid password',
    async validTest => {
      // isolate cookies, so request doesn't reuse them
      const cookies = request.jar();
      const { response, body } = await request.post(url, {
        jar: cookies,
        form: { username: 'all-permissions-and-state', password: 'password' },
        json: true
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(
        response.headers['set-cookie'].some(
          cookie =>
            cookie.startsWith('session=') && cookie.endsWith('; httponly')
        ),
        'sends an http-only session cookie'
      );
      validTest.same(body, { id: 2000 }, 'sends back the user ID');
    }
  );

  loginTest.test(
    'JSON body: with valid username and valid password',
    async validTest => {
      // isolate cookies, so request doesn't reuse them
      const cookies = request.jar();
      const { response, body } = await request.post(url, {
        jar: cookies,
        json: { username: 'all-permissions-and-state', password: 'password' }
      });

      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(
        response.headers['set-cookie'].some(
          cookie =>
            cookie.startsWith('session=') && cookie.endsWith('; httponly')
        ),
        'sends an http-only session cookie'
      );
      validTest.same(body, { id: 2000 }, 'sends back the user ID');
    }
  );
});
