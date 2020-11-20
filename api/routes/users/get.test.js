const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');
const mockResponse = require('../../util/mockResponse');

let err;
let res;
let next;
let app;
let getAllUsers;
let getUserByID;

tap.test('user GET endpoint', async endpointTest => {

  endpointTest.beforeEach(done => {
    err = { error: 'err0r' };
    res = mockResponse();
    next = sinon.stub();
    app = {
      get: sinon.stub()
    }
    getAllUsers = sinon.stub();
    getUserByID = sinon.stub();
    done();
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
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, { getAllUsers });
      handler = app.get.args.find(args => args[0] === '/users')[2];
      done();
    });

    handlerTest.test('database error', async invalidTest => {
      getAllUsers.rejects(err);
      await handler({}, res, next);
      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends back a list of users', async validTest => {
      getAllUsers.resolves('these are all the users');

      await handler({}, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith('these are all the users'),
        'body is set to the list of users'
      );
    });
  });

  endpointTest.test('get single user handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(done => {
      getEndpoint(app, { getUserByID });
      handler = app.get.args.find(args => args[0] === '/users/:id')[2];
      done();
    });

    handlerTest.test('database error', async invalidTest => {
        getUserByID.rejects(err);
        await handler({ params: { id: 1 } }, res, next);
        invalidTest.ok(next.called, 'next is called');
        invalidTest.ok(next.calledWith(err), 'pass error to middleware');
      }
    );

    handlerTest.test(
      'sends a not-found error if the requested user does not exist',
      async invalidTest => {
        getUserByID.resolves();
        await handler({ params: { id: 1 } }, res);

        invalidTest.ok(res.status.calledWith(404), 'HTTP status set to 404');
        invalidTest.ok(res.send.notCalled, 'no body is sent');
        invalidTest.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends the requested user', async validTest => {
      getUserByID.resolves('here is a user');
      await handler({ params: { id: 1 } }, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        res.send.calledWith('here is a user'),
        'requested user is sent'
      );
    });
  });
});
