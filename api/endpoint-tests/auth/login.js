const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies

tap.test('login endpoint | /auth/login', loginTest => {
  const url = `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT || process.env.PORT || 8000}/auth/login`;

  loginTest.test('with no post body at all', invalidTest => {
    request.post(url, (err, response) => {
      invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
      invalidTest.done();
    });
  });

  const invalidCases = [{
    title: 'with a post body, but no username or password',
    data: { }
  }, {
    title: 'with a post body, but no username',
    data: { password: 'test-password' }
  }, {
    title: 'with a post body, but no password',
    data: { username: 'test-username' }
  }];

  invalidCases.forEach(invalidCase => {
    loginTest.test(`Form body: ${invalidCase.title}`, invalidTest => {
      request.post(url, { form: invalidCase.data }, (err, response) => {
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.done();
      });
    });

    loginTest.test(`JSON body: ${invalidCase.title}`, invalidTest => {
      request.post(url, { json: invalidCase.data }, (err, response) => {
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.done();
      });
    });
  });

  const badCredentialsCases = [{
    title: 'with invalid username, invalid password',
    data: {
      username: 'nobody',
      password: 'nothing'
    }
  }, {
    title: 'with invalid username, valid password',
    data: {
      username: 'nobody',
      password: 'password'
    }
  }, {
    title: 'with valid username, invalid password',
    data: {
      username: 'em@il.com',
      password: 'nothing'
    }
  }];

  badCredentialsCases.forEach(badCredentialsCase => {
    loginTest.test(`Form body: ${badCredentialsCase.title}`, invalidTest => {
      request.post(url, { form: badCredentialsCase.data }, (err, response) => {
        invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
        invalidTest.done();
      });
    });

    loginTest.test(`JSON body: ${badCredentialsCase.title}`, invalidTest => {
      request.post(url, { json: badCredentialsCase.data }, (err, response) => {
        invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
        invalidTest.done();
      });
    });
  });

  loginTest.test('Form body: with valid username and valid password', validTest => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    request.post(url, { jar: cookies, form: { username: 'em@il.com', password: 'password' } }, (err, response, body) => {
      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(response.headers['set-cookie'].some(cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')), 'sends an http-only session cookie');
      validTest.notOk(body, 'does not send a body');
      validTest.done();
    });
  });

  loginTest.test('JSON body: with valid username and valid password', validTest => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    request.post(url, { jar: cookies, json: { username: 'em@il.com', password: 'password' } }, (err, response, body) => {
      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(response.headers['set-cookie'].some(cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')), 'sends an http-only session cookie');
      validTest.notOk(body, 'does not send a body');
      validTest.done();
    });
  });

  loginTest.done();
});
