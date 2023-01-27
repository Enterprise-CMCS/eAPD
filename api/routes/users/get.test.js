import tap from 'tap';
import { stub, match } from 'sinon';
import { can } from '../../middleware/index.js';
import getEndpoint from './get.js';
import mockExpress from '../../util/mockExpress.js';
import mockResponse from '../../util/mockResponse.js';

let res;
let next;
let app;
let getUserByID;
let handler;

tap.test('user GET endpoint', async endpointTest => {
  endpointTest.beforeEach(() => {
    res = mockResponse();
    next = stub();
    app = mockExpress();
    getUserByID = stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/users/:id', can('view-users'), match.func),
      'single user GET endpoint is registered'
    );
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
