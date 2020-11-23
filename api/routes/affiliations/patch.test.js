const tap = require('tap');
const sinon = require('sinon');

const can = require('../../middleware').can;
const patchEndpoint = require('./patch');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');
const mockDb = require('../../db/dbMock.test');

let app;
let res;
let db;

const route = '/states/:stateId/affiliations/:id';
const canMiddleware = can('edit-affiliations');

tap.test('PATCH affiliations endpoint', async t => {

  t.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    db = mockDb();
  });

  t.test('setup', async t => {
    patchEndpoint(app, { db });
    t.ok(
      app.patch.calledWith(route, canMiddleware, sinon.match.func),
      `express route to 'PATCH ${route}' is configured`
    );
  });

});
