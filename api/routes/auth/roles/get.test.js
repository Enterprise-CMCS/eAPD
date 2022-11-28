import tap from 'tap';
import sinon from 'sinon';
import { can } from '../../../middleware';
import getEndpoint from './get';
import mockExpress from '../../../util/mockExpress';
import mockResponse from '../../../util/mockResponse';

let app;
let res;
let next;
let getActiveAuthRoles;

tap.test('auth roles GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getActiveAuthRoles = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/auth/roles', can('view-roles'), sinon.match.func),
      'roles GET endpoint is registered'
    );
  });

  endpointTest.test('get roles handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getActiveAuthRoles });
      handler = app.get.args.find(args => args[0] === '/auth/roles')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getActiveAuthRoles.rejects(err);

      await handler({}, res, next);

      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends back a list of roles', async validTest => {
      const roles = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];

      getActiveAuthRoles.resolves(roles);

      await handler({}, res);

      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(res.send.calledWith(roles), 'body is a list of roles roles');
    });
  });
});
