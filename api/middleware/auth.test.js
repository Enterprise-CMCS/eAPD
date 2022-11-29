import tap from 'tap';
import { loggedIn, can, validForState } from './auth.js';

const sandbox = require('sinon').createSandbox();

const res = {
  status: sandbox.stub(),
  send: sandbox.stub(),
  end: sandbox.stub()
};
const next = sandbox.spy();

tap.beforeEach(() => {
  sandbox.resetBehavior();
  sandbox.resetHistory();

  res.status.returns(res);
  res.send.returns(res);
  res.end.returns(res);
});

tap.test('logged in middleware', async loggedInMiddlewareTest => {
  loggedInMiddlewareTest.test(
    'rejects if the user is not logged in',
    async invalidTest => {
      loggedIn({}, res, next);

      invalidTest.ok(
        res.status.calledWith(401),
        'HTTP status set to 401 Unauthorized'
      );
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
  canMiddlewareTest.test(
    'rejects if the user is not logged in',
    async invalidTest => {
      can('activity')({}, res, next);

      invalidTest.ok(
        res.status.calledWith(401),
        'HTTP status set to 401 Unauthorized'
      );
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

      invalidTest.ok(
        res.status.calledWith(403),
        'HTTP status set to 403 Forbidden'
      );
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

  canMiddlewareTest.test(
    'rejects if the user has one of the expected activities',
    async invalidTest => {
      can(['foo', 'bar'])({ user: { activities: ['foo'] } }, res, next);

      invalidTest.ok(res.send.notCalled, 'no body is sent');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  canMiddlewareTest.test(
    'rejects if the user has one of the expected activities',
    async invalidTest => {
      can(['foo', 'bar'])({ user: { activities: ['bar'] } }, res, next);

      invalidTest.ok(res.send.notCalled, 'no body is sent');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  canMiddlewareTest.test(
    'rejects if the user does not have the expected activity',
    async invalidTest => {
      can(['activity', 'quidditch'])(
        { user: { activities: ['foo', 'bar', 'baz', 'qux'] } },
        res,
        next
      );

      invalidTest.ok(
        res.status.calledWith(403),
        'HTTP status set to 403 Forbidden'
      );
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );
});

tap.test('"validForState" middleware', async validForStateMiddlewareTest => {
  validForStateMiddlewareTest.test(
    'rejects if the user is not logged in',
    async invalidTest => {
      validForState('activity')({ params: { stateId: 'no' } }, res, next);

      invalidTest.ok(
        res.status.calledWith(401),
        'HTTP status set to 401 Unauthorized'
      );
      invalidTest.ok(res.end.called, 'response is terminated');
      invalidTest.ok(
        next.notCalled,
        'endpoint handling chain is not continued'
      );
    }
  );

  validForStateMiddlewareTest.test(
    'rejects if the user does not have the expected state',
    async invalidTest => {
      validForState('stateId')(
        {
          user: { state: { id: 'YES' }, role: 'eAPD State Admin' },
          params: { stateId: 'NO' }
        },
        res,
        next
      );

      invalidTest.ok(
        res.status.calledWith(403),
        'HTTP status set to 403 Forbidden.'
      );
      invalidTest.ok(res.end.called, 'response is  terminated');
      invalidTest.ok(next.notCalled, 'endpoint handling chain was continued');
    }
  );

  validForStateMiddlewareTest.test(
    'continues if the user does not have the expected state, but is a federal admin',
    async validTest => {
      validForState('stateId')(
        {
          user: { state: { id: 'YES' }, role: 'eAPD Federal Admin' },
          params: { stateId: 'NO' }
        },
        res,
        next
      );

      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.status.notCalled, 'HTTP status not set');
      validTest.ok(res.end.notCalled, 'response is not terminated');
      validTest.ok(next.called, 'endpoint handling chain is continued');
    }
  );

  validForStateMiddlewareTest.test(
    'continues if the user has the expected state',
    async validTest => {
      validForState('stateId')(
        {
          user: { state: { id: 'yes' }, role: '' },
          params: { stateId: 'yes' }
        },
        res,
        next
      );

      validTest.ok(res.send.notCalled, 'no body is sent');
      validTest.ok(res.status.notCalled, 'HTTP status not set');
      validTest.ok(res.end.notCalled, 'response is not terminated');
      validTest.ok(next.called, 'endpoint handling chain is continued');
    }
  );
});
