const tap = require('tap');
const sinon = require('sinon');

const { loggedIn } = require('../../middleware');
const getEndpoint = require('./get');

tap.test('states GET endpoints', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };
  const get = sandbox.stub();
  const pick = sandbox.stub();
  const related = sandbox.stub();
  const StateModel = {
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

    StateModel.where.returns(StateModel);
    UserModel.where.returns(UserModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/states', loggedIn, sinon.match.func),
      'user-specific states GET endpoint is registered'
    );
  });

  endpointTest.test('get user-specific state handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      getEndpoint(app, StateModel, UserModel);
      handler = app.get.args.find(args => args[0] === '/states')[2];
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        UserModel.fetch.rejects();

        await handler({ params: {}, user: {} }, res);

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async invalidTest => {
        UserModel.fetch.resolves({ related });
        related.returns({ get });
        get.withArgs('id').returns(null);

        await handler({ params: {}, user: {} }, res);

        invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends state program info', async validTest => {
      UserModel.fetch.resolves({ related });
      related.returns({ get, pick });
      get.withArgs('id').returns('state-id');
      pick
        .withArgs([
          'id',
          'medicaid_office',
          'name',
          'program_benefits',
          'program_vision',
          'state_pocs'
        ])
        .returns('program info');

      await handler({ params: {}, user: {} }, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('program info'),
        'program info is sent back'
      );
    });
  });
});
