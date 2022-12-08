const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;
let next;
let getAllAPDsByState;

tap.test('GET /apds', async endpointTest => {
  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAllAPDsByState = sinon.stub();
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
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAllAPDsByState });
      handler = app.get.args.find(args => args[0] === '/apds')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getAllAPDsByState.rejects(err);

      await handler({ params: {}, user: { state: { id: 'va' } } }, res, next);

      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async invalidTest => {
        await handler({ params: {}, user: { state: {} } }, res);

        invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 401');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apds', async validTest => {
      getAllAPDsByState.resolves([
        {
          _id: 'a',
          createdAt: 'created a',
          updatedAt: 'updated a',
          stateId: 'va',
          name: 'apd a',
          years: 'years a',
          status: 'status a',
          other: 'stuff'
        },
        {
          _id: 'b',
          createdAt: 'created b',
          updatedAt: 'updated b',
          stateId: 'va',
          name: 'apd b',
          years: 'years b',
          status: 'status b',
          gets: 'removed'
        },
        {
          _id: 'c',
          createdAt: 'created c',
          updatedAt: 'updated c',
          stateId: 'va',
          name: 'apd c',
          years: 'years c',
          status: 'status c',
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
            updated: 'updated a',
            state: 'va',
            name: 'apd a',
            status: 'status a',
            years: 'years a'
          },
          {
            id: 'b',
            created: 'created b',
            updated: 'updated b',
            state: 'va',
            name: 'apd b',
            status: 'status b',
            years: 'years b'
          },
          {
            id: 'c',
            created: 'created c',
            updated: 'updated c',
            state: 'va',
            name: 'apd c',
            status: 'status c',
            years: 'years c'
          }
        ]),
        'APD info is sent back'
      );
    });
  });
});

tap.test('apds/:id GET endpoint', async tests => {
  let getAPDByIDAndState;
  let adminCheckAPDDocument;

  tests.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAPDByIDAndState = sinon.stub();
    adminCheckAPDDocument = sinon.stub();
  });

  tests.test('setup', async test => {
    getEndpoint(app);

    test.ok(
      app.get.calledWith(
        '/apds/:id([0-9a-fA-F]{24}$)',
        can('view-document'),
        sinon.match.func
      ),
      'user-specific apds GET endpoint is registered'
    );
  });

  tests.test('get single apd handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAPDByIDAndState, adminCheckAPDDocument });
      handler = app.get.args.find(
        args => args[0] === '/apds/:id([0-9a-fA-F]{24}$)'
      )[2];
    });

    handlerTest.test('database error', async t => {
      const err = { error: 'err0r' };
      getAPDByIDAndState.rejects(err);

      await handler(
        { params: { id: '1' }, user: { state: { id: 'va' } } },
        res,
        next
      );

      t.ok(next.called, 'next is called');
      t.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test(
      'sends an unauthorized error code if the user does not have an associated state',
      async test => {
        await handler({ params: { id: '1' }, user: { state: {} } }, res);

        test.ok(res.status.calledWith(403), 'HTTP status set to 403');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test(
      'sends a not found error if there are no valid APDs',
      async test => {
        getAPDByIDAndState.returns(undefined);

        await handler(
          { params: { id: '1' }, user: { state: { id: 'va' } } },
          res,
          next
        );

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends apd', async test => {
      getAPDByIDAndState.returns({
        _id: 'id',
        createdAt: 'created at',
        updatedAt: 'updated at',
        stateId: 'va',
        stuff: 'from',
        goes: 'here',
        status: 'status',
        other: 'stuff',
        budget: {}
      });
      adminCheckAPDDocument.returns([]);

      await handler(
        { params: { id: '1' }, user: { state: { id: 'va' } } },
        res,
        next
      );

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(
        res.send.calledWith({
          apd: {
            id: 'id',
            created: 'created at',
            updated: 'updated at',
            stuff: 'from',
            goes: 'here',
            state: 'va',
            status: 'status',
            other: 'stuff'
          },
          adminCheck: [],
          budget: {}
        }),
        'APD info is sent back'
      );
    });
  });
});
