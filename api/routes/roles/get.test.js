const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;
let next;
let getAllActiveRoles;
let handler;

tap.test('GET /roles', async endpointTest => {
  endpointTest.beforeEach(done => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAllActiveRoles = sinon.stub();
    done();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/roles', can('view-roles'), sinon.match.func),
      'roles GET endpoint is registered'
    );
  });

  endpointTest.test('get all roles handler', async handlerTest => {
    handlerTest.beforeEach(done => {
      getEndpoint(app, { getAllActiveRoles });
      handler = app.get.args.find(args => args[0] === '/roles')[2];
      done();
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getAllActiveRoles.rejects(err);

      await handler({ user: { activities: ['view-roles'] } }, res, next);
      console.log('next', JSON.stringify(next));

      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    // handlerTest.test(
    //   'send an unauthorized error code if the user does not have permission to view roles',
    //   async invalidTest => {
    //     await handler({ user: { activities: [] } }, res, next);

    //     invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
    //     invalidTest.ok(res.send.notCalled, 'no body is sent');
    //     invalidTest.ok(res.end.called, 'response is terminated');
    //   }
    // );

    // handlerTest.test('sends roles', async validTest => {
    //   const roles = [
    //     {
    //       id: 272,
    //       name: 'eAPD Federal Admin'
    //     },
    //     {
    //       id: 276,
    //       name: 'eAPD State Admin'
    //     },
    //     {
    //       id: 277,
    //       name: 'eAPD State Staff'
    //     },
    //     {
    //       id: 278,
    //       name: 'eAPD State Contractor'
    //     }
    //   ];
    //   getAllActiveRoles.resolves(roles);

    //   await handler({ user: { activities: ['view-roles'] } }, res, next);

    //   validTest.ok(res.status.notCalled, 'HTTP status not explicitly set');
    //   validTest.ok(res.send.calledWith(roles), 'Roles info sent back');
    // });
  });
});
