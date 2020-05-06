/* eslint-disable global-require, no-shadow */
const jwt = require('jsonwebtoken');
const tap = require('tap');

tap.test('jwtUtils', async t => {
  let env;

  const payload = {
    sub: 'exampleSessionId'
  };

  t.beforeEach(async () => {
    // override process.env
    // https://stackoverflow.com/a/42304479/2675670
    env = { ...process.env };

    process.env.SESSION_LIFETIME_MINUTES = 5;
    process.env.SESSION_SECRET = 'super-secret';
  });

  t.afterEach(async () => {
    // return process.env to its original state
    process.env = env;
  });

  t.test('signWebToken()', async t => {
    const { signWebToken, verifyWebTokenOptions } = require('./jwtUtils');

    t.test('given a signed JWT', async t => {
      const token = signWebToken(payload);
      const result = jwt.verify(token, process.env.SESSION_SECRET, verifyWebTokenOptions);
      t.equal(result.sub, payload.sub, 'we can decode the payload subject');
    });
  });

  t.test('verifyWebToken()', async t => {
    const { verifyWebToken, signWebTokenOptions } = require('./jwtUtils');

    t.test('given a valid JWT', async t => {
      const token = jwt.sign(payload, process.env.SESSION_SECRET, signWebTokenOptions);
      const result = verifyWebToken(token);

      t.isA(result, 'object', 'returns a payload object');
      t.equal(result.sub, 'exampleSessionId', "'sub' is the session id");
      t.isA(result.iat, 'number', "'iat' (issued at) is a number");
      t.isA(result.exp, 'number', "'exp' (expires) is a number");
      const expectedExp =
        result.iat + process.env.SESSION_LIFETIME_MINUTES * 60;
      t.equal(
        result.exp,
        expectedExp,
        "'exp' is iat + SESSION_LIFETIME_MINUTES * 60 seconds"
      );
      t.equal(result.iss, 'CMS eAPD API', "'iss' (issued) is CMS eAPD API");
    });

    t.test('given an invalid JWT string', async t => {
      const token = 'garbage.garbage.garbage';
      const result = verifyWebToken(token);
      t.equal(result, false, 'returns false');
    });

    t.test('given an expired JWT', async t => {
      let options = { ...signWebTokenOptions };
      options.expiresIn = '-1ms';
      const token = jwt.sign(payload, process.env.SESSION_SECRET, options);
      const result = verifyWebToken(jwt);
      t.equal(result, false, 'returns false');
    });
  });

  t.test('jwtExtractor()', async t => {
    const { jwtExtractor } = require('./jwtUtils');
    let request;

    t.beforeEach(async () => {
      request = new Map()
    });

    const scenarios = [
      ['Bearer xxx.yyy.zzz', 'xxx.yyy.zzz', 'returns the JWT'],
      ['bearer xxx.yyy.zzz', 'xxx.yyy.zzz', 'returns the JWT'],
      ['bearer', null, 'returns null'],
      ['bearer ', null, 'returns null'],
      ['', null, 'returns null'],
      ['Elephanter xxx.yyy.zzz', null, 'returns null']
    ];

    scenarios.forEach(([header, expected, message]) => {
      t.test(`given Authorization header is '${header}'`, async t => {
        request.set('Authorization', header);
        const result = jwtExtractor(request);
        t.equal(result, expected, message);
      });
    });

  });
});
