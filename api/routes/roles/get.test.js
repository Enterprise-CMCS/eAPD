const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');
const { activeRoles } = require('../../util/roles');

let app;
let res;
let next;
let getAllActiveRoles;
let handler;

tap.test('GET /roles', async endpointTest => {
  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAllActiveRoles = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/roles', can('view-roles'), sinon.match.func),
      'roles GET endpoint is registered'
    );
  });

  endpointTest.test('get all roles handler', async handlerTest => {
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAllActiveRoles });
      handler = app.get.args.find(args => args[0] === '/roles')[2];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getAllActiveRoles.rejects(err);

      await handler(
        { params: {}, user: { activities: ['view-roles'], roles: [] } },
        res,
        next
      );

      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends all roles for a System Admin', async validTest => {
      const roles = activeRoles;
      getAllActiveRoles.resolves(roles);

      await handler(
        { user: { activities: ['view-roles'], role: 'eAPD System Admin' } },
        res,
        next
      );

      validTest.ok(res.status.calledWith(200), 'HTTP status set to 200');
      validTest.ok(res.send.calledWith(roles), 'Roles info sent back');
    });

    handlerTest.test(
      'sends active and available roles for a Federal Admin',
      async validTest => {
        const roles = activeRoles.filter(
          role =>
            role.name === 'eAPD State Admin' &&
            role.name === 'eAPD Federal Admin'
        );
        getAllActiveRoles.resolves(roles);

        await handler(
          { user: { activities: ['view-roles'], role: 'eAPD Federal Admin' } },
          res,
          next
        );

        validTest.ok(res.status.calledWith(200), 'HTTP status set to 200');
        validTest.ok(res.send.calledWith(roles), 'Roles info sent back');
      }
    );

    handlerTest.test(
      'sends active and available roles for a State Admin',
      async validTest => {
        const roles = activeRoles.filter(
          role =>
            role.name !== 'eAPD State Staff' &&
            role.name !== 'eAPD State Contractor'
        );
        getAllActiveRoles.resolves(roles);

        await handler(
          { user: { activities: ['view-roles'], role: 'eAPD State Admin' } },
          res,
          next
        );

        validTest.ok(res.status.calledWith(200), 'HTTP status set to 200');
        validTest.ok(res.send.calledWith(roles), 'Roles info sent back');
      }
    );
  });
});
