const tap = require('tap');
const sinon = require('sinon');

const loggedIn = require('../..//middleware').loggedIn;
const getEndpoint = require('./get');

tap.test('me GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/me', loggedIn, sinon.match.func),
      'me GET endpoint is registered'
    );
  });

  endpointTest.test('get me users handler', async test => {
    getEndpoint(app);
    const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][2];

    await meHandler({ user: 'this is the user' }, res);

    test.ok(
      res.send.calledWith('this is the user'),
      'sends back the user object'
    );
  });
});
