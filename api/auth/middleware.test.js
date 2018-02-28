const tap = require('tap');
const sandbox = require('sinon').createSandbox();

const middleware = require('./middleware');

const res = {
  status: sandbox.stub(),
  send: sandbox.stub(),
  end: sandbox.stub()
};
const next = sandbox.spy();

tap.beforeEach(done => {
  sandbox.resetBehavior();
  sandbox.resetHistory();

  res.status.returns(res);
  res.send.returns(res);
  res.end.returns(res);

  done();
});

tap.test('logged in middleware', async loggedInMiddlewareTest => {
  const loggedIn = middleware.loggedIn;
  loggedInMiddlewareTest.test(
    'rejects if the user is not logged in',
    async invalidTest => {
      loggedIn({}, res, next);

      invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  loggedInMiddlewareTest.test(
    'continues if the user is logged in',
    async validTest => {
      loggedIn({ user: true }, res, next);

      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.status.notCalled, 'HTTP status not set');
      validTest.ok(res.end.notCalled, 'response is not terminated');
      validTest.ok(next.called, 'endpoint handling chain is continued');
    }
  );
});

tap.test('"can" middleware', async canMiddlewareTest => {
  const can = middleware.can;

  canMiddlewareTest.test(
    'rejects if the user is not logged in',
    async invalidTest => {
      can('activity')({}, res, next);

      invalidTest.ok(res.status.calledWith(403), 'HTTP status set to 403');
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  canMiddlewareTest.test(
    'rejects if the user does not have the expected activity',
    async invalidTest => {
      can('activity')({ user: { activities: [] } }, res, next);

      invalidTest.ok(res.status.calledWith(401), 'HTTP status set to 401');
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  canMiddlewareTest.test(
    'continues if the user has the expected activity',
    async validTest => {
      can('activity')({ user: { activities: ['activity'] } }, res, next);

      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.status.notCalled, 'HTTP status not set');
      validTest.ok(res.end.notCalled, 'response is not terminated');
      validTest.ok(next.called, 'endpoint handling chain is continued');
    }
  );
});
