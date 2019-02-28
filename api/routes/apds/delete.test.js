const tap = require('tap');
const sinon = require('sinon');

const { can, userCanEditAPD } = require('../../middleware');
const endpoint = require('./delete');

tap.test('apds/:id DELETE endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();

  const app = { delete: sandbox.stub() };

  const req = {
    meta: {
      apd: {
        save: sandbox.stub(),
        set: sandbox.stub()
      }
    }
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async test => {
    endpoint(app);

    test.ok(
      app.delete.calledWith(
        '/apds/:id',
        can('view-document'),
        userCanEditAPD(),
        sinon.match.func
      ),
      'DELETE endpoint is registered'
    );
  });

  endpointTest.test('handles unexpected errors', async test => {
    endpoint(app);
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();

    req.meta.apd.set.throws(new Error('random thing gone wrong'));

    await handler(req, res);

    test.ok(res.status.calledWith(500), 'HTTP status set to 500');
    test.ok(res.send.notCalled, 'no body is sent');
    test.ok(res.end.called, 'response is terminated');
  });

  endpointTest.test('updates the status and saves', async test => {
    endpoint(app);
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();

    req.meta.apd.save.resolves();

    await handler(req, res);

    test.ok(
      req.meta.apd.set.calledWith('status', 'archived'),
      'apd status is set to archived'
    );
    test.ok(
      req.meta.apd.set.calledBefore(req.meta.apd.save),
      'status is set before apd is saved'
    );
    test.ok(req.meta.apd.save.calledOnce, 'apd is saved');
    test.ok(res.status.calledWith(204), 'HTTP status set to 204');
    test.ok(res.send.notCalled, 'no body is sent');
    test.ok(res.end.called, 'response is terminated');
  });
});
