const tap = require('tap');
const sinon = require('sinon');

const { can, loadApd, userCanAccessAPD } = require('../../../middleware');
const endpoint = require('./delete');

tap.test('apds version DELETE endpoint', async tests => {
  const sandbox = sinon.createSandbox();

  const app = {
    delete: sandbox.stub()
  };

  const res = {
    end: sandbox.stub(),
    status: sandbox.stub()
  };

  const req = {
    meta: {
      apd: {
        set: sandbox.stub(),
        save: sandbox.stub()
      }
    }
  };

  let handler;

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.end.returns(res);
    res.status.returns(res);

    endpoint(app);
    handler = app.delete.args[0].slice(-1)[0];
  });

  tests.test('setup', async test => {
    test.ok(
      app.delete.calledWith(
        '/apds/:id/versions',
        can('submit-document'),
        userCanAccessAPD(),
        loadApd(),
        sinon.match.func
      ),
      'versions DELETE endpoint is registered'
    );
  });

  tests.test('handles a database error', async test => {
    req.meta.apd.set.throws();
    await handler(req, res);

    test.ok(res.status.calledWith(500), 'HTTP status 500 is set');
    test.ok(res.end.calledOnce, 'response is terminated');
  });

  tests.test('withdraws an APD', async test => {
    await handler(req, res);

    test.ok(
      req.meta.apd.set.calledWith({ status: 'draft' }),
      'APD status is set to draft'
    );
    test.ok(
      req.meta.apd.set.calledBefore(req.meta.apd.save),
      'status is set before saving'
    );
    test.ok(req.meta.apd.save.calledOnce, 'APD is saved');
    test.ok(res.status.calledWith(204), 'HTTP status 204 is set');
    test.ok(res.end.calledOnce, 'response is terminated');
  });
});
