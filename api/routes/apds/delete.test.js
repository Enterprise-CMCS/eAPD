const tap = require('tap');
const sinon = require('sinon');

const { can, userCanEditAPD } = require('../../middleware');
const endpoint = require('./delete');

tap.test('apds/:id DELETE endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();

  const app = { delete: sandbox.stub() };
  const deleteAPDByID = sandbox.stub();

  const req = {
    meta: {
      apd: {
        id: 'apd id'
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
    endpoint(app, { deleteAPDByID });
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();

    deleteAPDByID.rejects(new Error('random thing gone wrong'));

    await handler(req, res);

    test.ok(res.status.calledWith(500), 'HTTP status set to 500');
    test.ok(res.send.notCalled, 'no body is sent');
    test.ok(res.end.called, 'response is terminated');
  });

  endpointTest.test('updates the status and saves', async test => {
    endpoint(app, { deleteAPDByID });
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();

    deleteAPDByID.resolves();

    await handler(req, res);

    test.ok(deleteAPDByID.calledWith('apd id'), 'the right APD is deleted');
    test.ok(res.status.calledWith(204), 'HTTP status set to 204');
    test.ok(res.send.notCalled, 'no body is sent');
    test.ok(res.end.called, 'response is terminated');
  });
});
