const jwt = require('jsonwebtoken');
const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const session = require('./session');

tap.test('session functions', async tests => {
  process.env.SESSION_SECRET = 'secret';
  process.env.SESSION_LIFETIME_MINUTES = 1;

  let res = {};
  const writeHead = sandbox.spy();

  const next = sandbox.spy();

  const cookies = { get: sandbox.stub(), set: sandbox.stub() };

  class Cookies {
    constructor() {
      this.get = cookies.get;
      this.set = cookies.set;
    }
  }

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res = {
      writeHead
    };
  });

  const middleware = session({ Cookies });

  tests.test(
    'middleware populates session from cookie',
    async sessionLoadTests => {
      sessionLoadTests.test('with a token that is not JWT', async test => {
        const req = {};
        cookies.get.withArgs('token').returns('not jwt');

        await middleware(req, res, next);

        test.same(req.session, {}, 'session is an empty object');
      });

      sessionLoadTests.test(
        'with a token whose signature is invalid',
        async test => {
          const req = {};
          const token = jwt.sign(
            { payload: { session: 'info' } },
            'wrong secret',
            { algorithm: 'HS256' }
          );
          cookies.get.withArgs('token').returns(token);

          await middleware(req, res, next);

          test.same(req.session, {}, 'session is an empty object');
        }
      );

      sessionLoadTests.test('with an expired token', async test => {
        const req = {};
        const token = jwt.sign({ payload: { session: 'info' } }, 'secret', {
          algorithm: 'HS256',
          expiresIn: '-1s'
        });
        cookies.get.withArgs('token').returns(token);

        await middleware(req, res, next);

        test.same(req.session, {}, 'session is an empty object');
      });

      sessionLoadTests.test('with an invalid token issuer', async test => {
        const req = {};
        const token = jwt.sign(
          { iss: 'nobody', payload: { session: 'info' } },
          'secret',
          { algorithm: 'HS256', expiresIn: '1m' }
        );
        cookies.get.withArgs('token').returns(token);

        await middleware(req, res, next);

        test.same(req.session, {}, 'session is an empty object');
      });

      sessionLoadTests.test('with a valid token', async test => {
        const req = {};
        const token = jwt.sign(
          { iss: 'CMS eAPD API', payload: { session: 'info' } },
          'secret',
          { algorithm: 'HS256', expiresIn: '1m' }
        );
        cookies.get.withArgs('token').returns(token);

        await middleware(req, res, next);

        test.same(
          req.session,
          { session: 'info' },
          'session is set on request object'
        );
      });
    }
  );

  tests.test(
    'middleware sets cookies when response headers are written',
    async writeTests => {
      writeTests.test(
        'expires cookie when there is no session data',
        async test => {
          await middleware({}, res, next);
          res.writeHead('arg1', 'arg2');

          test.ok(
            cookies.set.calledWith('token', '', { maxAge: 0, httpOnly: true }),
            'cookie is empty and expired'
          );
          test.ok(
            writeHead.calledWith('arg1', 'arg2'),
            'original writeHead is called with args'
          );
        }
      );

      writeTests.test('sets cookie when there is session data', async test => {
        const token = jwt.sign(
          { iss: 'CMS eAPD API', payload: { session: 'info' } },
          'secret',
          { algorithm: 'HS256', expiresIn: '10m' }
        );
        cookies.get.withArgs('token').returns(token);

        await middleware({}, res, next);
        res.writeHead('arg1', 'arg2');

        const cookieValue = jwt.decode(cookies.set.args[0][1]);

        test.ok(
          cookies.set.calledWith('token', sinon.match.string, {
            httpOnly: true
          }),
          'sets the cookie'
        );
        test.match(
          cookieValue,
          {
            iss: 'CMS eAPD API',
            payload: { session: 'info' },
            iat: /^\d+$/,
            // expiration is based on SESSION_LIFETIME_MINUTES, set above to 1
            exp: cookieValue.iat + 60
          },
          'sets an expected cookie'
        );
        test.ok(
          writeHead.calledWith('arg1', 'arg2'),
          'original writeHead is called with args'
        );
      });

      writeTests.test(
        'sets cookie when session data is changed',
        async test => {
          const token = jwt.sign(
            { iss: 'CMS eAPD API', payload: { session: 'info' } },
            'secret',
            { algorithm: 'HS256', expiresIn: '10m' }
          );
          cookies.get.withArgs('token').returns(token);

          const req = {};
          await middleware(req, res, next);
          req.session = { newSessionProp: 'bob' };

          res.writeHead('arg1', 'arg2');

          const cookieValue = jwt.decode(cookies.set.args[0][1]);

          test.ok(
            cookies.set.calledWith('token', sinon.match.string, {
              httpOnly: true
            }),
            'sets the cookie'
          );
          test.match(
            cookieValue,
            {
              iss: 'CMS eAPD API',
              payload: { newSessionProp: 'bob' },
              iat: /^\d+$/,
              // expiration is based on SESSION_LIFETIME_MINUTES, set above to 1
              exp: cookieValue.iat + 60
            },
            'sets an expected cookie'
          );
          test.ok(
            writeHead.calledWith('arg1', 'arg2'),
            'original writeHead is called with args'
          );
        }
      );
    }
  );

  tests.test('middleware destroy sessions', async destroyTests => {
    destroyTests.test(
      'when there is not a valid session in the first place',
      async test => {
        const req = {};
        await middleware(req, res, next);
        middleware.destroy();

        res.writeHead('arg1', 'arg2');

        test.same(req.session, {}, 'session is emptied');
        test.ok(
          cookies.set.calledWith('token', '', { maxAge: 0, httpOnly: true }),
          'cookie is empty and expired'
        );
      }
    );
    destroyTests.test('when there is a valid session', async test => {
      const token = jwt.sign(
        { iss: 'CMS eAPD API', payload: { session: 'info' } },
        'secret',
        { algorithm: 'HS256', expiresIn: '10m' }
      );
      cookies.get.withArgs('token').returns(token);

      const req = {};
      await middleware(req, res, next);
      middleware.destroy();

      res.writeHead('arg1', 'arg2');

      test.same(req.session, {}, 'session is emptied');
      test.ok(
        cookies.set.calledWith('token', '', { maxAge: 0, httpOnly: true }),
        'cookie is empty and expired'
      );
    });
  });
});
