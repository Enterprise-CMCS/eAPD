const tap = require('tap');
const sinon = require('sinon');

const { can, userCanEditAPD } = require('../../../middleware');
const patchEndpoint = require('./patch');

tap.test('apds budget PATCH endpoint', async tests => {
  const sandbox = sinon.createSandbox();
  let handler;

  const app = {
    patch: sandbox.stub()
  };

  const updateAPDBudget = sandbox.stub();

  const res = {
    end: sandbox.spy(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  const next = sandbox.stub();

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.send.returns(res);
    res.status.returns(res);

    patchEndpoint(app, {
      updateAPDBudget
    });
    handler = app.patch.args[0][app.patch.args[0].length - 1];
  });

  tests.test('sets up the endpoint with the server', async test => {
    patchEndpoint(app);
    test.ok(
      app.patch.calledWith(
        '/apds/:id/budget',
        can('edit-document'),
        userCanEditAPD(),
        sinon.match.func
      ),
      'creates a PATCH endpoint at the right location with the right permissions'
    );
  });

  tests.test('handles the case where an APD ID is not provided', async test => {
    await handler({ params: {} }, res, next);

    test.ok(res.status.calledWith(400), 'sends an HTTP 404 status');
  });

  tests.test('fails gracefully on arbitrary database error', async test => {
    const error = new Error('fake error');
    updateAPDBudget.throws(error);
    await handler(
      { params: { id: 'apd id' }, user: { state: { id: 'co' } } },
      res,
      next
    );

    test.ok(next.calledWith(error), 'calls next with the error');
  });

  tests.test('save the updated budget if everything is good', async test => {
    const budget = {
      id: 'budget id',
      apdId: 'apd id'
    };

    updateAPDBudget.resolves(budget);

    await handler(
      {
        params: { id: 'apd id' },
        user: { state: { id: 'co' } }
      },
      res,
      next
    );

    test.ok(
      updateAPDBudget.calledWith('apd id', 'co'),
      'updates the right set of things'
    );

    test.ok(
      res.send.calledWith({
        budget
      })
    );
  });
});
