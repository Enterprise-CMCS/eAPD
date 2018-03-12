const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../auth/middleware').loggedIn;
const putEndpoint = require('./put');

tap.test('apds PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };
  const apds = sandbox.stub();
  const ApdModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const UserModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    ApdModel.where.returns(ApdModel);
    UserModel.where.returns(UserModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app, ApdModel, UserModel);

    setupTest.ok(
      app.put.calledWith('/apds/:id', loggedInMiddleware, sinon.match.func),
      'apds PUT endpoint is registered'
    );
  });

  endpointTest.test('edit apds handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      putEndpoint(app, ApdModel, UserModel);
      handler = app.put.args.find(args => args[0] === '/apds/:id')[2];
    });

    handlerTest.test(
      'sends a not found error if requesting to edit a apd that does not exist',
      async notFoundTest => {
        const req = { params: { id: 1 }, body: { status: 'foo' } };
        ApdModel.fetch.resolves(null);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an error if requesting to edit a apd not associated with user',
      async notFoundTest => {
        const req = {
          params: { id: 1 },
          user: { id: 123 },
          body: { status: 'foo' }
        };
        ApdModel.fetch.resolves(true);
        UserModel.fetch.resolves({ apds });
        apds.returns([2, 3, 4]);

        await handler(req, res);

        notFoundTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        notFoundTest.ok(res.send.notCalled, 'no body is sent');
        notFoundTest.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        const req = { params: { id: 1 }, body: { status: 'foo' } };
        ApdModel.fetch.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );
  });
});
