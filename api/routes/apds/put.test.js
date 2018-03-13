const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../auth/middleware').loggedIn;
const putEndpoint = require('./put');

tap.test('apds PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };
  const ApdModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const UserModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const Apd = {
    set: sandbox.stub(),
    save: sandbox.stub(),
    toJSON: sandbox.stub()
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
        UserModel.fetch.resolves({ apds: () => [2, 3, 4] });

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

    handlerTest.test('updates a valid apd object', async validTest => {
      const req = {
        params: { id: 1 },
        user: { id: 123 },
        body: { status: 'foo', misc: 'baz' }
      };

      Apd.toJSON.returns({ status: 'json-status' });
      Apd.save.resolves();
      ApdModel.fetch.resolves(Apd);
      UserModel.fetch.resolves({ apds: () => [1, 2, 3] });

      await handler(req, res);

      validTest.ok(
        Apd.set.calledWith({ status: 'foo' }),
        'sets the apd status field'
      );
      validTest.ok(
        Apd.save.calledAfter(Apd.set),
        'the model is saved after values are set'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        Apd.toJSON.calledOnce,
        'database object is converted to pure object'
      );
      validTest.ok(
        res.send.calledWith({ status: 'json-status' }),
        'updated apd data is sent'
      );
    });
  });
});
