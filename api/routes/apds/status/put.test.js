const tap = require('tap');
const sinon = require('sinon');

const { can, loadApd } = require('../../../middleware');
const endpoint = require('./put');

tap.test('apds status PUT endpoint', async tests => {
  const sandbox = sinon.createSandbox();

  const req = {
    body: {},
    meta: {
      apd: {
        get: sandbox.stub(),
        set: sandbox.stub(),
        save: sandbox.stub()
      }
    }
  };

  const res = {
    end: sandbox.stub(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  const app = {
    put: sandbox.stub()
  };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    req.body = {};
    req.meta.apd.set.returns(req.meta.apd);

    res.send.returns(res);
    res.status.returns(res);
  });

  const handler = () => {
    endpoint(app);
    return app.put.args[0][app.put.args[0].length - 1];
  };

  tests.test('setup', async test => {
    endpoint(app);

    test.ok(
      app.put.calledWith(
        '/apds/:id/status',
        can('submit-federal-response'),
        loadApd(),
        sinon.match.func
      ),
      'apd-specific status setting PUT endpoint is registered'
    );
  });

  tests.test('rejects if the current status is draft', async test => {
    req.meta.apd.get.withArgs('status').returns('draft');

    await handler()(req, res);

    test.ok(res.status.calledWith(400), 'sets HTTP status 400');
    test.ok(
      res.send.calledWith({ error: 'apd-in-draft' }),
      'sends an error message'
    );
    test.ok(res.end.calledOnce, 'response is closed');
  });

  tests.test('rejects if target status is invalid', async test => {
    req.meta.apd.get.withArgs('status').returns('not draft');
    req.body = { status: 'something or other' };

    await handler()(req, res);

    test.ok(res.status.calledWith(400), 'sets HTTP status 400');
    test.ok(
      res.send.calledWith({ error: 'apd-invalid-status' }),
      'sends an error message'
    );
    test.ok(res.end.calledOnce, 'response is closed');
  });

  tests.test('updates status if everything is good', async test => {
    req.meta.apd.get.withArgs('status').returns('not draft');
    req.body = { status: 'in clearance' };

    await handler()(req, res);

    test.ok(res.status.calledWith(204), 'sets HTTP status 400');
    test.ok(res.send.notCalled, 'does not send a body');
    test.ok(res.end.calledOnce, 'response is closed');
  });
});
