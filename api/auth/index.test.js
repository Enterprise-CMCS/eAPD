const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

process.env.SESSION_SECRET = 'secret';
const authSetup = require('./index').setup;

tap.test('authentication setup', async authTest => {
  const app = {
    use: sandbox.spy(),
    get: sandbox.spy(),
    post: sandbox.spy()
  };

  const auth = {
    getNonce: sandbox.stub().returns('auth nonce')
  };

  const passport = {
    authenticate: sandbox.stub().returns('passport-authenticate'),
    deserializeUser: sandbox.spy(),
    initialize: sandbox.stub().returns('passport-initialize'),
    use: sandbox.spy()
  };

  const deserializeUser = sandbox.stub();
  const serializeUser = sandbox.stub();
  const removeSession = sandbox.spy();
  const signToken = sandbox.stub();

  const localStrategy = 'localStrategy';
  const jwtMiddleware = 'jwtMiddleware';

  const res = {
    send: sandbox.stub(),
    status: sandbox.stub(),
    end: sandbox.spy()
  };
  res.send.returns(res);
  res.status.returns(res);

  authTest.beforeEach(done => {
    sandbox.resetHistory();
    done();
  });

  authTest.test(
    'setup calls everything we expect it to',
    async setupTest => {
      authSetup(app, { passport, localStrategy, jwtMiddleware });

      setupTest.ok(
        passport.use.calledWith(localStrategy),
        'localStrategy is registered'
      );

      setupTest.ok(
        app.use.calledWith('passport-initialize'),
        'adds passport initialization to middleware'
      );

      setupTest.ok(passport.initialize.calledOnce, 'passport is initialized');

      setupTest.ok(
        passport.authenticate.calledWith('local'),
        'passport local authentication method is used'
      );

      setupTest.ok(
        app.post.calledWith(
          '/auth/login',
          'passport-authenticate',
          sinon.match.func
        ),
        'adds a function handler to POST /auth/login using the passport authenticate middleware'
      );

      setupTest.ok(
        app.post.calledWith('/auth/login/nonce', sinon.match.func),
        'adds a function handler to POST /auth/login/nonce'
      );

      setupTest.ok(app.use.calledWith(jwtMiddleware), 'adds jwtMiddleware');

      setupTest.ok(
        app.get.calledWith,
        '/auth/logout',
        sinon.match.func,
        'adds a function handler to GET /auth/logout'
      );

    }
  );

  authTest.test('POST nonce endpoint behaves as expected', async nonceTests => {
    nonceTests.test('sends a 400 error if there is no body', async test => {
      authSetup(app, { auth, deserializeUser, removeSession, serializeUser });
      const post = app.post.args.find(a => a[0] === '/auth/login/nonce')[1];

      post({}, res);

      test.ok(res.status.calledOnce, 'an HTTP status is set once');
      test.ok(res.status.calledWith(400), 'sets a 400 HTTP status');
      test.ok(res.send.notCalled, 'HTTP body is not sent');
      test.ok(res.end.calledOnce, 'response is ended one time');
    });

    nonceTests.test(
      'sends a 400 error if there is a body but no username',
      async test => {
        authSetup(app, { auth, deserializeUser, removeSession, serializeUser });
        const post = app.post.args.find(a => a[0] === '/auth/login/nonce')[1];

        post({ body: {} }, res);

        test.ok(res.status.calledOnce, 'an HTTP status is set once');
        test.ok(res.status.calledWith(400), 'sets a 400 HTTP status');
        test.ok(res.send.notCalled, 'HTTP body is not sent');
        test.ok(res.end.calledOnce, 'response is ended one time');
      }
    );

    nonceTests.test('returns a nonce if there is a body', async test => {
      authSetup(app, { auth, deserializeUser, removeSession, serializeUser });
      const post = app.post.args.find(a => a[0] === '/auth/login/nonce')[1];

      post({ body: { username: 'user name here' } }, res);

      test.ok(
        auth.getNonce.calledWith('user name here'),
        'gets a nonce based on the username from the body'
      );
      test.ok(
        res.send.calledWith({ nonce: 'auth nonce' }),
        'get a nonce if there is a POST body'
      );
    });
  });

  authTest.test('POST login endpoint behaves as expected', async test => {
    const user = {
      im: 'weasel',
      ir: 'baboon'
    };
    serializeUser.yields(null, 'unique-session-id');
    signToken.withArgs({ sub: 'unique-session-id' }).returns('xxx.yyy.zzz');
    authSetup(app, { auth, serializeUser, signToken });
    const post = app.post.args.find(a => a[0] === '/auth/login')[2];
    const req = { user };

    await post(req, res);

    test.ok(
      res.send.calledWith({ token: 'xxx.yyy.zzz', user }),
      'HTTP body contains the jwt and user objects'
    );
  });

  // logout without valid token
  authTest.test('GET /auth/logout, unauthorized request', async t => {
    authSetup(app, { auth });
    const get = app.get.args[0][1];
    const req = { payload: null };

    get(req, res);

    t.ok(res.status.calledWith(200), 'sets a 200 HTTP status');
  });

  // logout with valid token
  authTest.test('GET /auth/logout, authorized request', async t => {
    authSetup(app, { auth, removeSession });
    const get = app.get.args[0][1];
    const req = {
      payload: { sub: 'unique-session-id' },
      logout: sandbox.spy()
    };

    get(req, res);

    t.ok(
      removeSession.calledWith('unique-session-id'),
      'user session is removed'
    );
    t.ok(req.logout.calledOnce, 'user is logged out');
    t.ok(res.status.calledWith(200), 'sets a 200 HTTP status');
  });
});
