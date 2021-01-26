const tap = require('tap');
const sinon = require('sinon');

const endpoints = require('./get');

tap.test('docs endpoints', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub() };

  const di = {
    getFile: sandbox.stub()
  };

  const res = {
    setHeader: sandbox.stub(),
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  const next = sandbox.stub();

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.setHeader.returns(res);
    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    endpoints(app);

    setupTest.ok(
      app.get.calledWith('/docs/account-registration', sinon.match.func),
      'endpoint for fetching account registration doc is setup'
    );
  });

  endpointTest.test(
    'GET endpoint for fetching account registration doc',
    async tests => {
      let handler;
      tests.beforeEach(async () => {
        endpoints(app, { ...di });
        handler = app.get.args[0].pop();
      });

      tests.test(
        'there is an unexpected error getting the account registration doc',
        async test => {
          di.getFile.rejects(new Error('some other error'));

          await handler({ params: {} }, res, next);

          test.ok(
            next.calledWith(sinon.match.instanceOf(Error)),
            'sends error to next'
          );
          test.ok(
            next.calledWith(sinon.match({ message: 'some other error' })),
            'sends some other error message to next'
          );
        }
      );

      tests.test(
        'successfully received account registration doc',
        async test => {
          const file = {};
          di.getFile.resolves(file);

          await handler({ params: {} }, res, next);

          test.ok(res.send.calledWith(file), 'sends the file');
          test.ok(res.end.calledAfter(res.send), 'response is terminated');
        }
      );
    }
  );
});
