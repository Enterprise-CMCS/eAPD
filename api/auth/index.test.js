const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

process.env.SESSION_SECRET = 'secret';
const authSetup = require('./index').setup;

tap.test('authentication setup', async (authTest) => {
  const app = {
    use: sandbox.spy(),
    get: sandbox.spy(),
    post: sandbox.spy(),
    put: sandbox.spy(),
    del: sandbox.spy()
  };

  const passport = {
    use: sandbox.spy(),
    serializeUser: sandbox.spy(),
    deserializeUser: sandbox.spy(),
    initialize: sandbox.stub().returns('passport-initialize'),
    session: sandbox.stub().returns('passport-session'),
    authenticate: sandbox.stub().returns('passport-authenticate')
  };

  const strategies = ['strategy1', 'strategy2'];

  authTest.beforeEach((done) => {
    sandbox.resetHistory();
    done();
  });

  authTest.test('setup calls everything we expect it to', async (setupTest) => {
    authSetup(app, passport, strategies);

    setupTest.equal(
      app.use.callCount,
      3,
      'three middleware functions added to app'
    );
    setupTest.ok(
      app.use.calledWith(sinon.match.func),
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
      app.post.calledOnce,
      'a single POST endpoint is added to the app'
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

  authTest.test('setup works with defaults, too', async (setupTest) => {
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
      app.post.calledOnce,
      'a single POST endpoint is added to the app'
    );
    setupTest.ok(
      app.post.calledWith('/auth/login', sinon.match.func, sinon.match.func),
      'POST login endpoint is setup'
    );

    setupTest.ok(app.put.notCalled, 'no PUT endpoints are added to the app');
    setupTest.ok(app.del.notCalled, 'no DELETE endpoints are added to the app');
  });

  authTest.test('GET logout endpoint behaves as expected', async (getTest) => {
    authSetup(app, passport, strategies);
    const get = app.get.args[0][1];

    const req = {
      logout: sinon.spy()
    };

    const res = {
      send: sinon.stub(),
      status: sinon.stub(),
      end: sinon.spy()
    };
    res.send.returns(res);
    res.status.returns(res);

    get(req, res);

    getTest.ok(req.logout.calledOnce, 'user is logged out');
    getTest.ok(res.status.calledOnce, 'an HTTP status is set once');
    getTest.ok(res.status.calledWith(200), 'sets a 200 HTTP status');
    getTest.ok(res.send.notCalled, 'HTTP body is not sent');
    getTest.ok(res.end.calledOnce, 'response is ended one time');
  });

  authTest.test('POST login endpoint behaves as expected', async (postTest) => {
    authSetup(app, passport, strategies);
    const post = app.post.args[0][2];

    const res = {
      send: sinon.stub(),
      status: sinon.stub(),
      end: sinon.spy()
    };
    res.send.returns(res);
    res.status.returns(res);

    post({ user: { id: 'test-user-id' } }, res);

    postTest.ok(res.status.calledOnce, 'an HTTP status is set once');
    postTest.ok(res.status.calledWith(200), 'sets a 200 HTTP status');
    postTest.ok(
      res.send.calledWith({ id: 'test-user-id' }),
      'HTTP body is set to the user ID'
    );
    postTest.ok(res.end.calledOnce, 'response is ended one time');
  });
});
