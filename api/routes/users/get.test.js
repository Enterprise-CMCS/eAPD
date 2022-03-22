const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let res;
let next;
let app;
let getAllUsers;
let getUserByID;
let handler;

tap.test('user GET endpoint', async endpointTest => {
  endpointTest.beforeEach(() => {
    res = mockResponse();
    next = sinon.stub();
    app = mockExpress();
    getAllUsers = sinon.stub();
    getUserByID = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/users/:id', can('view-users'), sinon.match.func),
      'single user GET endpoint is registered'
    );
    setupTest.ok(
      app.get.calledWith('/users', can('view-users'), sinon.match.func),
      'all users GET endpoint is registered'
    );
  });

  endpointTest.test('get all users handler', async handlerTest => {
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAllUsers });
      handler = app.get.args.find(args => args[0] === '/users')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getAllUsers.rejects(err);
      await handler({}, res, next);
      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends back a list of users', async validTest => {
      getAllUsers.resolves([{ userInfo: 'these are all the users' }]);

      await handler({}, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.json.calledWith([{ userInfo: 'these are all the users' }]),
        'body is set to the list of users'
      );
    });
  });

  endpointTest.test('get single user handler', async handlerTest => {
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getUserByID });
      handler = app.get.args.find(args => args[0] === '/users/:id')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getUserByID.rejects(err);
      await handler({ params: { id: 1 } }, res, next);
      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test(
      'sends a not-found error if the requested user does not exist',
      async invalidTest => {
        getUserByID.resolves();
        await handler({ params: { id: 1 } }, res);

        invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends the requested user', async validTest => {
      getUserByID.resolves({ userInfo: 'here is a user' });
      await handler({ params: { id: 1 } }, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.json.calledWith({ userInfo: 'here is a user' }),
        'requested user is sent'
      );
    });
  });
});
