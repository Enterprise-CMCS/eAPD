const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../../../auth/middleware').loggedIn;
const canMiddleware = require('../../../auth/middleware').can('view-state');
const getEndpoint = require('./get');

tap.test('states/program GET endpoints', async endpointTest => {
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
      app.get.calledWith(
        '/states/:id/program',
        canMiddleware,
        sinon.match.func
      ),
      'specific states/program GET endpoint is registered'
    );
    setupTest.ok(
      app.get.calledWith(
        '/states/program',
        loggedInMiddleware,
        sinon.match.func
      ),
      'user-specific states/program GET endpoint is registered'
    );
  });

  endpointTest.test('get specific state handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      getEndpoint(app, StateModel, UserModel);
      handler = app.get.args.find(args => args[0] === '/states/:id/program')[2];
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        StateModel.fetch.rejects();

        await handler({ params: {} }, res);

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not-found error if the requested state does not exist',
      async invalidTest => {
        StateModel.fetch.resolves(null);

        await handler({ params: {} }, res);

        invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends state program info', async validTest => {
      pick
        .withArgs(['program_benefits', 'program_vision'])
        .returns('program info');
      StateModel.fetch.resolves({ pick });

      await handler({ params: {} }, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('program info'),
        'program info is sent back'
      );
    });
  });

  endpointTest.test('get user-specific state handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(async () => {
      getEndpoint(app, StateModel, UserModel);
      handler = app.get.args.find(args => args[0] === '/states/program')[2];
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        UserModel.fetch.rejects();

        await handler({}, res);

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

        await handler({ user: {} }, res);

        invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 403');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends state program info', async validTest => {
      UserModel.fetch.resolves({ related });
      related.returns({ get, pick });
      get.withArgs('id').returns('state-id');
      pick
        .withArgs(['program_benefits', 'program_vision'])
        .returns('program info');

      await handler({ user: {} }, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith('program info'),
        'program info is sent back'
      );
    });
  });

  // endpointTest.test('get all users handler', async handlerTest => {
  //   let handler;
  //   handlerTest.beforeEach(done => {
  //     getEndpoint(app, UserModel);
  //     handler = app.get.args.find(args => args[0] === '/users')[2];
  //     done();
  //   });
  //
  //   handlerTest.test(
  //     'sends a server error code if there is a database error',
  //     async invalidTest => {
  //       UserModel.fetchAll.rejects();
  //
  //       await handler({}, res);
  //
  //       invalidTest.ok(
  //         UserModel.fetchAll.calledWith({
  //           columns: sinon.match.array.deepEquals(['id', 'email'])
  //         }),
  //         'selects only the fields we want'
  //       );
  //       invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
  //       invalidTest.ok(res.send.notCalled, 'no body is sent');
  //       invalidTest.ok(res.end.called, 'response is terminated');
  //     }
  //   );
  //
  //   handlerTest.test('sends back a list of users', async validTest => {
  //     const get = sinon.stub();
  //     get
  //       .withArgs('id')
  //       .onFirstCall()
  //       .returns(1)
  //       .onSecondCall()
  //       .returns(2);
  //     get
  //       .withArgs('email')
  //       .onFirstCall()
  //       .returns('hi')
  //       .onSecondCall()
  //       .returns('bye');
  //     const users = [{ get }, { get }];
  //     UserModel.fetchAll.resolves(users);
  //
  //     await handler({}, res);
  //
  //     validTest.ok(
  //       UserModel.fetchAll.calledWith({
  //         columns: sinon.match.array.deepEquals(['id', 'email'])
  //       }),
  //       'selects only the fields we want'
  //     );
  //     validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
  //     validTest.ok(
  //       res.send.calledWith([{ email: 'hi', id: 1 }, { email: 'bye', id: 2 }]),
  //       'body is set to the list of users'
  //     );
  //   });
  // });
  //
  // endpointTest.test('get single user handler', async handlerTest => {
  //   let handler;
  //   handlerTest.beforeEach(done => {
  //     getEndpoint(app, UserModel);
  //     handler = app.get.args.find(args => args[0] === '/users/:id')[2];
  //     done();
  //   });
  //
  //   handlerTest.test('rejects invalid requests', async invalidTests => {
  //     const invalidCases = [
  //       {
  //         title: 'no user ID',
  //         params: {}
  //       },
  //       {
  //         title: 'non-numeric ID',
  //         params: { id: 'letters' }
  //       }
  //     ];
  //
  //     invalidCases.forEach(invalidCase => {
  //       invalidTests.test(invalidCase.title, async invalidTest => {
  //         handler({ params: invalidCase.params }, res);
  //         invalidTest.ok(res.status.calledWith(400), 'HTTP status set to 400');
  //         invalidTest.ok(
  //           res.send.calledWith({ error: 'get-user-invalid' }),
  //           'sets an error message'
  //         );
  //         invalidTest.ok(res.end.called, 'response is terminated');
  //       });
  //     });
  //   });
  //
  //   handlerTest.test(
  //     'sends a server error code if there is a database error',
  //     async invalidTest => {
  //       UserModel.fetch.rejects();
  //
  //       await handler({ params: { id: 1 } }, res);
  //
  //       invalidTest.ok(
  //         UserModel.where.calledWith({ id: 1 }),
  //         'looks for only the specific user'
  //       );
  //       invalidTest.ok(
  //         UserModel.fetch.calledWith({
  //           columns: sinon.match.array.deepEquals([
  //             'id',
  //             'email',
  //             'name',
  //             'position',
  //             'phone',
  //             'state'
  //           ])
  //         }),
  //         'selects only the fields we want'
  //       );
  //       invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
  //       invalidTest.ok(res.send.notCalled, 'no body is sent');
  //       invalidTest.ok(res.end.called, 'response is terminated');
  //     }
  //   );
  //
  //   handlerTest.test(
  //     'sends a not-found error if the requested user does not exist',
  //     async invalidTest => {
  //       UserModel.fetch.resolves();
  //       await handler({ params: { id: 1 } }, res);
  //
  //       invalidTest.ok(
  //         UserModel.where.calledWith({ id: 1 }),
  //         'looks for only the specific user'
  //       );
  //       invalidTest.ok(
  //         UserModel.fetch.calledWith({
  //           columns: sinon.match.array.deepEquals([
  //             'id',
  //             'email',
  //             'name',
  //             'position',
  //             'phone',
  //             'state'
  //           ])
  //         }),
  //         'selects only the fields we want'
  //       );
  //       invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
  //       invalidTest.ok(res.send.notCalled, 'no body is sent');
  //       invalidTest.ok(res.end.called, 'response is terminated');
  //     }
  //   );
  //
  //   handlerTest.test('sends the requested user', async validTest => {
  //     UserModel.fetch.resolves({
  //       id: 1,
  //       email: 'test-email@dotcom.com',
  //       name: 'Person Name',
  //       position: 'position',
  //       phone: '555-555-5555',
  //       state: 'FR'
  //     });
  //
  //     await handler({ params: { id: 1 } }, res);
  //
  //     validTest.ok(
  //       UserModel.where.calledWith({ id: 1 }),
  //       'looks for only the specific user'
  //     );
  //     validTest.ok(
  //       UserModel.fetch.calledWith({
  //         columns: sinon.match.array.deepEquals([
  //           'id',
  //           'email',
  //           'name',
  //           'position',
  //           'phone',
  //           'state'
  //         ])
  //       }),
  //       'selects only the fields we want'
  //     );
  //     validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
  //     validTest.ok(
  //       res.send.calledWith({
  //         id: 1,
  //         email: 'test-email@dotcom.com',
  //         name: 'Person Name',
  //         position: 'position',
  //         phone: '555-555-5555',
  //         state: 'FR'
  //       }),
  //       'requested user is sent'
  //     );
  //   });
  // });
});
