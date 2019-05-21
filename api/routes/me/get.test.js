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

  const deserialize = sandbox.stub();

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

  endpointTest.test('get me users handler', async handlerTest => {
    getEndpoint(app, { deserialize });
    const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][2];

    const get = sinon.stub();
    get.withArgs('id').returns('state id');
    get.withArgs('name').returns('state name');

    const userModel = {
      related: sinon
        .stub()
        .withArgs('state')
        .returns({ get })
    };

    const user = {
      id: 'user-id',
      model: userModel
    };

    deserialize.yields(null, {
      info: 'deserialized user from session',
      model: userModel
    });

    await meHandler(
      { session: { passport: { user: 'session-id' } }, user },
      res
    );

    handlerTest.ok(
      res.send.calledWith({
        info: 'deserialized user from session',
        state: { id: 'state id', name: 'state name' },
        model: undefined
      }),
      'sends back the user object'
    );
  });
});
