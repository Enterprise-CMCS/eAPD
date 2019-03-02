const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

tap.test('apds GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub() };
  const toJSON = sandbox.stub();
  const ApdModel = {
    where: sandbox.stub(),
    fetchAll: sandbox.stub()
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

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/apds', can('view-document'), sinon.match.func),
      'user-specific apds GET endpoint is registered'
    );
  });

  endpointTest.test('get all apds handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, ApdModel);
      handler = app.get.args.find(args => args[0] === '/apds')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        ApdModel.fetchAll.rejects();

        await handler({ params: {}, user: { state: 'va' } }, res);

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async invalidTest => {
        await handler({ params: {}, user: { state: null } }, res);

        invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apds', async validTest => {
      ApdModel.fetchAll.resolves({ toJSON });
      ApdModel.withRelated = 'this is related stuff';
      toJSON.returns([
        { id: 'a', status: 'status a', years: 'years a', other: 'stuff' },
        { id: 'b', status: 'status b', years: 'years b', gets: 'removed' },
        { id: 'c', status: 'status c', years: 'years c', from: 'results' }
      ]);

      await handler({ params: {}, user: { state: 'va' } }, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(ApdModel.where.calledWith({ state_id: 'va' }));
      validTest.ok(
        res.send.calledWith([
          { id: 'a', status: 'status a', years: 'years a' },
          { id: 'b', status: 'status b', years: 'years b' },
          { id: 'c', status: 'status c', years: 'years c' }
        ]),
        'APD info is sent back'
      );
    });
  });
});

tap.test('apds/:id GET endpoint', async tests => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub() };
  const toJSON = sandbox.stub();
  const ApdModel = {
    where: sandbox.stub(),
    fetchAll: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  tests.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    ApdModel.where.returns(ApdModel);

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  tests.test('setup', async test => {
    getEndpoint(app);

    test.ok(
      app.get.calledWith(
        '/apds/:id(\\d+)',
        can('view-document'),
        sinon.match.func
      ),
      'user-specific apds GET endpoint is registered'
    );
  });

  tests.test('get single apd handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, ApdModel);
      handler = app.get.args.find(args => args[0] === '/apds/:id(\\d+)')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async test => {
        ApdModel.fetchAll.rejects();

        await handler({ params: { id: '1' }, user: { state: 'va' } }, res);

        test.ok(res.status.calledWith(500), 'HTTP status set to 500');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async test => {
        await handler({ params: { id: '1' }, user: { state: null } }, res);

        test.ok(res.status.calledWith(401), 'HTTP status set to 401');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not found error if there are no valid APds',
      async test => {
        ApdModel.fetchAll.resolves({ toJSON });
        ApdModel.withRelated = 'this is related stuff';
        toJSON.returns([]);

        await handler({ params: { id: '1' }, user: { state: 'va' } }, res);

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(ApdModel.where.calledWith({ id: '1', state_id: 'va' }));
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apd', async test => {
      ApdModel.fetchAll.resolves({ toJSON });
      ApdModel.withRelated = 'this is related stuff';
      toJSON.returns([{ id: 'a', years: 'years a', other: 'stuff' }]);

      await handler({ params: { id: '1' }, user: { state: 'va' } }, res);

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(ApdModel.where.calledWith({ id: '1', state_id: 'va' }));
      test.ok(
        res.send.calledWith({ id: 'a', years: 'years a', other: 'stuff' }),
        'APD info is sent back'
      );
    });
  });
});
