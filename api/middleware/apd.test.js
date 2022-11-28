import tap from 'tap';
import sinon from 'sinon';
import { loadApd, userCanAccessAPD, userCanEditAPD } from './apd';
import mockResponse from '../util/mockResponse';

let err;
let res;
let next;

tap.test('APD-related middleware', async middlewareTests => {
  middlewareTests.beforeEach(() => {
    err = { error: 'err0r' };
    res = mockResponse();
    next = sinon.stub();
  });

  middlewareTests.test('load apd', async loadApdTests => {
    const getAPDByID = sinon.stub();

    loadApdTests.test(
      'when there is an error loading the APD',
      async invalidTest => {
        getAPDByID.rejects(err);

        const req = { meta: {}, params: { 'apd-id': '9' } };
        await loadApd({ getAPDByID })(req, res, next);

        invalidTest.ok(next.called, 'next is called');
        invalidTest.ok(next.calledWith(err), 'pass error to middleware');
      }
    );

    loadApdTests.test('when there is no associated APD', async invalidTest => {
      getAPDByID.resolves(null);

      const req = { meta: {}, params: { 'apd-id': '9' } };
      await loadApd({ getAPDByID })(req, res, next);

      invalidTest.ok(res.status.calledWith(404), 'HTTP status is set to 400');
      invalidTest.ok(res.end.calledOnce, 'response is closed');
      invalidTest.ok(next.notCalled, 'next is not called');
    });

    loadApdTests.test('when there is an associated APD', async validTest => {
      getAPDByID.resolves({
        this: 'is the APD document',
        _id: 'apd id',
        stateId: 'apd state',
        status: 'draft or something',
        updatedAt: 'in the past',
        createdAt: 'in the further past'
      });

      const req = { meta: {}, params: { 'apd-id': '9' } };
      await loadApd({ getAPDByID })(req, res, next);

      validTest.ok(res.status.notCalled, 'HTTP status is not set');
      validTest.ok(res.end.notCalled, 'response is not closed');
      validTest.ok(next.calledOnce, 'next is called');
      validTest.same(
        req.meta.apd,
        {
          this: 'is the APD document',
          id: 'apd id',
          state: 'apd state',
          status: 'draft or something',
          updated: 'in the past',
          created: 'in the further past'
        },
        'sets the APD on the request object'
      );
    });
  });

  middlewareTests.test('user can access apd', async accessApdTests => {
    const loadApdMock = sinon.stub();
    const loadApdFake = () => loadApdMock;

    accessApdTests.beforeEach(async () => {
      loadApdMock.yields();
    });

    accessApdTests.test(
      'sends a 403 if the user does not have access to the APD',
      async invalidTest => {
        const req = {
          user: { state: 'not florp' },
          meta: { apd: { state: 'florp' } }
        };
        await userCanAccessAPD({ loadApd: loadApdFake })(req, res, next);

        invalidTest.ok(res.status.calledWith(403), 'HTTP status is set to 403');
        invalidTest.ok(res.end.calledOnce, 'response is closed');
        invalidTest.ok(next.notCalled, 'next is not called');
      }
    );

    accessApdTests.test(
      'passes if the user has access to the APD',
      async validTest => {
        const req = {
          user: { state: { id: 'florp' } },
          meta: { apd: { state: 'florp' } }
        };
        await userCanAccessAPD({ loadApd: loadApdFake })(req, res, next);

        validTest.ok(res.status.notCalled, 'HTTP status is not set');
        validTest.ok(res.end.notCalled, 'response is not closed');
        validTest.ok(next.calledOnce, 'next is called');
      }
    );
  });

  middlewareTests.test('user can edit apd', async tests => {
    const userCanAccessAPDMock = sinon.stub();
    const userCanAccessAPDFake = () => userCanAccessAPDMock;

    tests.beforeEach(async () => {
      userCanAccessAPDMock.yields();
    });

    tests.test('sends a 400 if the APD is not editable', async test => {
      const req = {
        meta: { apd: { status: 'not draft' } }
      };

      await userCanEditAPD({ userCanAccessAPD: userCanAccessAPDFake })(
        req,
        res,
        next
      );

      test.ok(res.status.calledWith(400), 'HTTP status is set to 400');
      test.ok(res.end.calledOnce, 'response is closed');
      test.ok(next.notCalled, 'next is not called');
    });

    tests.test('passes if the user has access to the APD', async validTest => {
      const req = {
        meta: { apd: { status: 'draft' } }
      };
      await userCanEditAPD()(req, res, next);

      validTest.ok(res.status.notCalled, 'HTTP status is not set');
      validTest.ok(res.end.notCalled, 'response is not closed');
      validTest.ok(next.calledOnce, 'next is called');
    });
  });
});
