/* eslint-disable no-shadow */
const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const patchEndpoint = require('./patch');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');
const mockDb = require('../../db/dbMock.test');

let app;
let res;
let next
let db;
let handler;

const route = '/states/:stateId/affiliations/:id';
const canMiddleware = can('edit-affiliations');

tap.test('PATCH affiliations endpoint', async t => {
  t.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    db = mockDb();
    next = sinon.stub();

    patchEndpoint(app, { db });

    handler = app.patch.args.find(
      args => args[0] === route
    )[3]

  });

  t.test('setup', async t => {
    patchEndpoint(app, { db });
    t.ok(
      app.patch.calledWith(route, canMiddleware, sinon.match.func),
      `express route to 'PATCH ${route}' is configured`
    );
  });

  t.test('missing body parameters', async t =>{

    await handler(
      { user: {id:1}, body: {foo:'foo'}, params:{state:'md', id: 7} },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400')
    t.ok(res.send.called, 'HTTP response was sent')
  })

  t.test('missing body parameters', async t =>{

    await handler(
      { user: {id:1}, body: {foo:'foo'}, params:{state:'md', id: 7} },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400')
    t.ok(res.send.called, 'HTTP response was sent')
  })

  t.test('missing body role', async t =>{

    await handler(
      { user: {id:1}, body: {status:'foo'}, params:{state:'md', id: 7} },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400')
    t.ok(res.send.called, 'HTTP response was sent')
  })

  t.test('missing body status', async t =>{

    await handler(
      { user: {id:1}, body: {roleId:'foo'}, params:{state:'md', id: 7} },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400')
    t.ok(res.send.called, 'HTTP response was sent')
  })




});
