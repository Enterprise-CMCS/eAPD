const tap = require('tap');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

process.env.SESSION_SECRET = 'secret';
const authSetup = require('../../auth').setup;

tap.test('authentication setup', (authTest) => {
  const app = {
    use: sandbox.spy(),
    post: sandbox.spy()
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

  authTest.test('setup calls everything we expect it to', (setupTest) => {
    authSetup(app, passport, strategies);

    setupTest.equal(app.use.callCount, 3, 'three middleware functions added to app');
    setupTest.ok(app.use.calledWith(sinon.match.func), 'adds session function to middleware');
    setupTest.ok(app.use.calledWith('passport-initialize'), 'adds passport initialization to middleware');
    setupTest.ok(app.use.calledWith('passport-session'), 'adds passport session to middleware');

    setupTest.equal(passport.use.callCount, 2, 'two passport strategies are configured');
    setupTest.ok(passport.use.calledWith('strategy1'), 'first strategy is registered');
    setupTest.ok(passport.use.calledWith('strategy2'), 'second strategy is registered');

    setupTest.ok(passport.initialize.calledOnce, 'passport is initialized');
    setupTest.ok(passport.session.calledOnce, 'passport session is setup');

    setupTest.ok(passport.serializeUser.calledOnce, 'user serialization function is set once');
    setupTest.ok(passport.deserializeUser.calledOnce, 'user deserialization function is set once');

    setupTest.ok(passport.authenticate.calledOnce, 'passport authenticate method is inserted one time');
    setupTest.ok(app.post.calledOnce, 'a single POST endpoint is added to the app');
    setupTest.ok(app.post.calledWith('/auth/login', 'passport-authenticate', sinon.match.func));

    setupTest.done();
  });

  authTest.test('setup works with defaults, too', (setupTest) => {
    authSetup(app);

    setupTest.equal(app.use.callCount, 3, 'three middleware functions added to app');
    setupTest.ok(app.post.calledOnce, 'a single POST endpoint is added to the app');
    setupTest.ok(app.post.calledWith('/auth/login', sinon.match.func, sinon.match.func));

    setupTest.done();
  });

  authTest.test('POST endpoint behaves as expected', (postTest) => {
    authSetup(app, passport, strategies);
    const post = app.post.args[0][2];

    const res = {
      send: sinon.spy()
    };

    post({ user: { id: 'test-user-id' } }, res);

    postTest.ok(res.send.calledOnce, 'a response is sent once');
    postTest.ok(res.send.calledWithMatch({ bearer: 'test-user-id' }), 'sends an object with a bearer property of the user ID');

    postTest.done();
  });

  authTest.done();
});
