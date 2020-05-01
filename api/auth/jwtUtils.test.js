/* eslint-disable global-require, no-shadow */
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

  t.test('signWebToken()', t => {
    const { signWebToken } = require('./jwtUtils');

    t.test('given a payload object', t => {
      const jwt = signWebToken(payload);
      t.match(jwt, /^.+\..+\..+$/, "returns a jwt like: 'xxx.yyy.zzz'");
    });
  });

  t.test('verifyWebToken()', t => {
    const { signWebToken, verifyWebToken } = require('./jwtUtils');

    t.test('given a valid JWT', t => {
      const jwt = signWebToken(payload);
      const result = verifyWebToken(jwt);

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

    t.test('given an invalid JWT', t => {
      const jwt = 'garbage.garbage.garbage';
      const result = verifyWebToken(jwt);
      t.equal(result, false, 'returns false');
    });
  });

  t.test('jwtExtractor()', t => {
    const { jwtExtractor } = require('./jwtUtils');
    let request = new Map();

    t.test('given a JWT in the request Authorization header', t => {
      request.set('Authorization', 'Bearer xxx.yyy.zzz');
      const result = jwtExtractor(request);
      t.equal(result, 'xxx.yyy.zzz', 'returns the JWT');
    });

    t.test('given no JWT in the request Authorization header', t => {
      const result = jwtExtractor(request);
      t.equal(result, null, 'returns null');
    });
  });
});
