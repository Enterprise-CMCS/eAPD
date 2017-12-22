const tap = require('tap');
const sandbox = require('sinon').createSandbox();

const middleware = require('../../auth/middleware');

const res = {
  status: sandbox.stub(),
  send: sandbox.stub(),
  end: sandbox.stub()
};
const next = sandbox.spy();

tap.beforeEach(done => {
  sandbox.reset();

  res.status.returns(res);
  res.send.returns(res);
  res.end.returns(res);

  done();
});

tap.test('logged in middleware', loggedInMiddlewareTest => {
  const loggedIn = middleware.loggedIn;
  loggedInMiddlewareTest.test(
    'rejects if the user is not logged in',
    invalidTest => {
      loggedIn({}, res, next);

      invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
      invalidTest.done();
    }
  );

  loggedInMiddlewareTest.test(
    'continues if the user is logged in',
    validTest => {
      loggedIn({ user: true }, res, next);

      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.status.notCalled, 'HTTP status not set');
      validTest.ok(res.end.notCalled, 'response is not terminated');
      validTest.ok(next.called, 'endpoint handling chain is continued');
      validTest.done();
    }
  );

  loggedInMiddlewareTest.done();
});
