const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

process.env.SESSION_SECRET = 'secret';
const authSetup = require('./index').setup;

tap.test('authentication setup', async authTest => {
  const app = {
    use: sandbox.spy(),
    get: sandbox.spy(),
    post: sandbox.spy(),
    put: sandbox.spy(),
    del: sandbox.spy()
  };

  const auth = {
    getNonce: sandbox.stub().returns('auth nonce')
  };

  const passport = {
    use: sandbox.spy(),
    serializeUser: sandbox.spy(),
    deserializeUser: sandbox.spy(),
    initialize: sandbox.stub().returns('passport-initialize'),
    session: sandbox.stub().returns('passport-session'),
    authenticate: sandbox.stub().returns('passport-authenticate')
  };

  const removeSession = sandbox.spy();

  const session = sandbox.stub();
  session.destroy = sandbox.stub();

  const strategies = ['strategy1', 'strategy2'];

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

  authTest.test('setup calls everything we expect it to', async setupTest => {
    authSetup(app, { passport, strategies, session });

    setupTest.equal(
      app.use.callCount,
      3,
      'three middleware functions added to app'
    );
    setupTest.ok(
      app.use.calledWith(session),
      'adds session function to middleware'
    );
    setupTest.ok(
      app.use.calledWith('passport-initialize'),
      'adds passport initialization to middleware'
    );
    setupTest.ok(
      app.use.calledWith('passport-session'),
      'adds passport session to middleware'
    );

    setupTest.equal(
      passport.use.callCount,
      2,
      'two passport strategies are configured'
    );
    setupTest.ok(
      passport.use.calledWith('strategy1'),
      'first strategy is registered'
    );
    setupTest.ok(
      passport.use.calledWith('strategy2'),
      'second strategy is registered'
    );

    setupTest.ok(passport.initialize.calledOnce, 'passport is initialized');
    setupTest.ok(passport.session.calledOnce, 'passport session is setup');

    setupTest.ok(
      passport.serializeUser.calledOnce,
      'user serialization function is set once'
    );
    setupTest.ok(
      passport.deserializeUser.calledOnce,
      'user deserialization function is set once'
    );

    setupTest.ok(
      passport.authenticate.calledOnce,
      'passport authenticate method is inserted one time'
    );
    setupTest.ok(
      passport.authenticate.calledWith('local'),
      'passport local authentication method is used'
    );

    setupTest.ok(
      app.get.calledOnce,
      'a single GET endpoint is added to the app'
    );
    setupTest.ok(
      app.get.calledWith,
      '/auth/logout',
      sinon.match.func,
      'adds a function handler to GET /auth/logout'
    );

    setupTest.ok(
      app.post.calledTwice,
      'two POST endpoints are added to the app'
    );
    setupTest.ok(
      app.post.calledWith('/auth/login/nonce', sinon.match.func),
      'adds a function handler to POST /auth/login/nonce'
    );
    setupTest.ok(
      app.post.calledWith(
        '/auth/login',
        'passport-authenticate',
        sinon.match.func
      ),
      'adds a function handler to POST /auth/login using the passport authenticate middleware'
    );

    setupTest.ok(app.put.notCalled, 'no PUT endpoints are added to the app');
    setupTest.ok(app.del.notCalled, 'no DELETE endpoints are added to the app');
  });

  authTest.test('setup works with defaults, too', async setupTest => {
    authSetup(app);

    setupTest.equal(
      app.use.callCount,
      3,
      'three middleware functions added to app'
    );
    setupTest.ok(
      app.get.calledOnce,
      'a single GET endpoint is added to the app'
    );
    setupTest.ok(
      app.get.calledWith('/auth/logout', sinon.match.func),
      'GET logout endpoint is setup'
    );
    setupTest.ok(
      app.post.calledTwice,
      'two POST endpoints are added to the app'
    );
    setupTest.ok(
      app.post.calledWith('/auth/login/nonce', sinon.match.func),
      'POST login endpoint is setup'
    );
    setupTest.ok(
      app.post.calledWith('/auth/login', sinon.match.func, sinon.match.func),
      'POST login endpoint is setup'
    );

    setupTest.ok(app.put.notCalled, 'no PUT endpoints are added to the app');
    setupTest.ok(app.del.notCalled, 'no DELETE endpoints are added to the app');
  });

  authTest.test('GET logout endpoint behaves as expected', async getTest => {
    authSetup(app, { removeSession, session });
    const get = app.get.args[0][1];

    const req = {
      logout: sinon.spy(),
      session: {
        passport: {
          user: 'session id'
        }
      }
    };

    get(req, res);

    getTest.ok(req.logout.calledOnce, 'user is logged out');
    getTest.ok(
      removeSession.calledWith('session id'),
      'session is removed from storage'
    );
    getTest.ok(session.destroy.calledOnce, 'session is destroyed');
    getTest.ok(res.status.calledOnce, 'an HTTP status is set once');
    getTest.ok(res.status.calledWith(200), 'sets a 200 HTTP status');
    getTest.ok(res.send.notCalled, 'HTTP body is not sent');
    getTest.ok(res.end.calledOnce, 'response is ended one time');
  });

  authTest.test('POST nonce endpoint behaves as expected', async nonceTests => {
    nonceTests.test('sends a 400 error if there is no body', async test => {
      authSetup(app, { auth, passport, session, strategies });
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
        authSetup(app, { auth, passport, session, strategies });
        const post = app.post.args.find(a => a[0] === '/auth/login/nonce')[1];

        post({ body: {} }, res);

        test.ok(res.status.calledOnce, 'an HTTP status is set once');
        test.ok(res.status.calledWith(400), 'sets a 400 HTTP status');
        test.ok(res.send.notCalled, 'HTTP body is not sent');
        test.ok(res.end.calledOnce, 'response is ended one time');
      }
    );

    nonceTests.test('returns a nonce if there is a body', async test => {
      authSetup(app, { auth, passport, session, strategies });
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
    authSetup(app);
    const post = app.post.args.find(a => a[0] === '/auth/login')[2];

    const req = {
      session: {
        passport: {
          user: 'session-id'
        }
      },
      user: {
        im: 'weasel',
        ir: 'baboon'
      }
    };

    await post(req, res);

    test.ok(
      res.send.calledWith({
        im: 'weasel',
        ir: 'baboon'
      }),
      'HTTP body is set to the user ID'
    );
  });
});
