const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

tap.test('apds GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub() };

  const getAllAPDsByState = sandbox.stub();

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

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
      getEndpoint(app, { getAllAPDsByState });
      handler = app.get.args.find(args => args[0] === '/apds')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async invalidTest => {
        getAllAPDsByState.rejects();

        await handler({ params: {}, user: { state: { id: 'va' } } }, res);

        invalidTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async invalidTest => {
        await handler({ params: {}, user: { state: {} } }, res);

        invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apds', async validTest => {
      getAllAPDsByState.resolves([
        {
          created_at: 'created a',
          document: {
            name: 'apd a',
            years: 'years a'
          },
          id: 'a',
          status: 'status a',
          updated_at: 'updated a',
          other: 'stuff'
        },
        {
          created_at: 'created b',
          document: {
            name: 'apd b',
            years: 'years b'
          },
          id: 'b',
          status: 'status b',
          updated_at: 'updated b',
          gets: 'removed'
        },
        {
          created_at: 'created c',
          document: {
            name: 'apd c',
            years: 'years c'
          },
          id: 'c',
          status: 'status c',
          updated_at: 'updated c',
          from: 'results'
        }
      ]);

      await handler({ params: {}, user: { state: { id: 'va' } } }, res);

      validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
      validTest.ok(
        res.send.calledWith([
          {
            id: 'a',
            created: 'created a',
            name: 'apd a',
            status: 'status a',
            updated: 'updated a',
            years: 'years a'
          },
          {
            id: 'b',
            created: 'created b',
            name: 'apd b',
            status: 'status b',
            updated: 'updated b',
            years: 'years b'
          },
          {
            id: 'c',
            created: 'created c',
            name: 'apd c',
            status: 'status c',
            updated: 'updated c',
            years: 'years c'
          }
        ]),
        'APD info is sent back'
      );
    });
  });
});

tap.test('apds/:id GET endpoint', async tests => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub() };

  const getAPDByIDAndState = sandbox.stub();

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  tests.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

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
      getEndpoint(app, { getAPDByIDAndState });
      handler = app.get.args.find(args => args[0] === '/apds/:id(\\d+)')[2];
      done();
    });

    handlerTest.test(
      'sends a server error code if there is a database error',
      async test => {
        getAPDByIDAndState.rejects();

        await handler(
          { params: { id: '1' }, user: { state: { id: 'va' } } },
          res
        );

        test.ok(res.status.calledWith(500), 'HTTP status set to 500');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async test => {
        await handler({ params: { id: '1' }, user: { state: {} } }, res);

        test.ok(res.status.calledWith(401), 'HTTP status set to 401');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not found error if there are no valid APds',
      async test => {
        getAPDByIDAndState.returns(null);

        await handler(
          { params: { id: '1' }, user: { state: { id: 'va' } } },
          res
        );

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apd', async test => {
      getAPDByIDAndState.returns({
        created_at: 'created at',
        document: {
          stuff: 'from',
          document: 'column',
          goes: 'here'
        },
        id: 'id',
        state_id: 'state',
        status: 'status',
        updated_at: 'updated at',
        other: 'stuff'
      });

      await handler(
        { params: { id: '1' }, user: { state: { id: 'va' } } },
        res
      );

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(
        res.send.calledWith({
          created: 'created at',
          id: 'id',
          stuff: 'from',
          document: 'column',
          goes: 'here',
          state: 'state',
          status: 'status',
          updated: 'updated at'
        }),
        'APD info is sent back'
      );
    });
  });
});
