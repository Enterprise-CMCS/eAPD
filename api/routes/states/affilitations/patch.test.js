/* eslint-disable no-shadow */
const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const patchEndpoint = require('./patch');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;
let handler;
let updateAuthAffiliation;

const route = '/states/:stateId/affiliations/:id';
const canMiddleware = can('edit-affiliations');

tap.test('PATCH affiliations endpoint', async t => {
  t.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    updateAuthAffiliation = sinon.stub();

    patchEndpoint(app, { updateAuthAffiliation_: updateAuthAffiliation });

    handler = app.patch.args.find(args => args[0] === route)[3];
  });

  t.test('setup', async t => {
    t.ok(
      app.patch.calledWith(route, canMiddleware, sinon.match.func),
      `express route to 'PATCH ${route}' is configured`
    );
  });

  t.test('missing body parameters', async t => {
    await handler(
      { user: { id: 1 }, body: { foo: 'foo' }, params: { state: 'md', id: 7 } },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400');
    t.ok(res.send.called, 'HTTP response was sent');
  });

  t.test('missing body parameters', async t => {
    await handler(
      { user: { id: 1 }, body: { foo: 'foo' }, params: { state: 'md', id: 7 } },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400');
    t.ok(res.send.called, 'HTTP response was sent');
  });

  t.test('missing body role', async t => {
    await handler(
      {
        user: { id: 1 },
        body: { status: 'foo' },
        params: { state: 'md', id: 7 }
      },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400');
    t.ok(res.send.called, 'HTTP response was sent');
  });

  t.test('missing body status', async t => {
    await handler(
      {
        user: { id: 1 },
        body: { roleId: 'foo' },
        params: { state: 'md', id: 7 }
      },
      res,
      next
    );

    t.ok(res.status.calledWith(400), 'HTTP status set to 400');
    t.ok(res.send.called, 'HTTP response was sent');
  });

  t.test('successfully updates the auth affiliation', async t => {
    updateAuthAffiliation
      .withArgs({
        stateId: 'md',
        newRoleId: 6,
        newStatus: 'approved',
        changedBy: 1,
        affiliationId: 7
      })
      .resolves(() => 'success');

    await handler(
      {
        user: { id: 1 },
        body: { roleId: 6, status: 'approved' },
        params: { stateId: 'md', id: 7 }
      },
      res,
      next
    );

    t.ok(res.status.calledWith(200), 'HTTP status set to 200');
    t.ok(res.end.called, 'HTTP response was ended');
    t.ok(updateAuthAffiliation.called, 'Update method was called');
  });

  t.test('errors out when updating auth affiliation', async t => {
    const err = { error: 'err0r' };

    updateAuthAffiliation
      .withArgs({
        stateId: 'ak',
        newRoleId: 5,
        newStatus: 'approved',
        changedBy: 10,
        changedByRole: 'eAPD State Admin',
        affiliationId: 8
      })
      .rejects(err);

    await handler(
      {
        user: { id: 10, role: 'eAPD State Admin' },
        body: { roleId: 5, status: 'approved' },
        params: { stateId: 'ak', id: 8 }
      },
      res,
      next
    );

    t.ok(next.called, 'next is called');
    t.ok(next.calledWith(err), 'pass error to middleware');
  });
});
