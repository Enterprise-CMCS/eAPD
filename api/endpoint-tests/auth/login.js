const tap = require('tap');
const request = require('request');

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
    form: { }
  }, {
    title: 'with a post body, but no username',
    form: { password: 'test-password' }
  }, {
    title: 'with a post body, but no password',
    form: { username: 'test-username' }
  }];

  invalidCases.forEach(invalidCase => {
    loginTest.test(invalidCase.title, invalidTest => {
      request.post(url, { form: invalidCase.form }, (err, response) => {
        invalidTest.equal(response.statusCode, 400, 'gives a 400 status code');
        invalidTest.done();
      });
    });
  });

  loginTest.test('with invalid username, valid password', invalidTest => {
    request.post(url, { form: { username: 'nobody', password: 'password' } }, (err, response) => {
      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.done();
    });
  });

  loginTest.test('with valid username, invalid password', invalidTest => {
    request.post(url, { form: { username: 'em@il.com', password: 'nothing' } }, (err, response) => {
      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.done();
    });
  });

  loginTest.test('with valid username and valid password', validTest => {
    // isolate cookies, so request doesn't reuse them
    const cookies = request.jar();
    request.post(url, { jar: cookies, form: { username: 'em@il.com', password: 'password' } }, (err, response, body) => {
      validTest.equal(response.statusCode, 200, 'gives a 200 status code');
      validTest.ok(response.headers['set-cookie'].some(cookie => cookie.startsWith('session=') && cookie.endsWith('; httponly')), 'sends an http-only session cookie');
      validTest.notOk(body, 'does not send a body');
      validTest.done();
    });
  });


  loginTest.done();
});
