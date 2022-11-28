import tap from 'tap';
import sinon from 'sinon';
import getEndpoint from './get';
import mockExpress from '../../util/mockExpress';
import mockResponse from '../../util/mockResponse';

let app;
let res;
let next;

tap.test('GET /affiliations/me', async tests => {
  let getAffiliationsByUserId;

  tests.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getAffiliationsByUserId = sinon.stub();
  });

  tests.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.beforeEach(() => {
      setupTest.ok(
        app.get.calledWith('/affiliations/me', sinon.match.func),
        'specific affiliation GET endpoint is registered'
      );
    });
  });

  tests.test('get affiliation for user handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getAffiliationsByUserId });
      handler = app.get.args.find(args => args[0] === '/affiliations/me')[2];
    });

    handlerTest.test('database error', async t => {
      const err = { error: 'err0r' };
      getAffiliationsByUserId.rejects(err);

      await handler({ id: '12345', user: { id: '30' } }, res, next);

      t.ok(next.called, 'next is called');
      t.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends affiliation', async test => {
      const affiliations = [
        {
          id: 30,
          userId: '00u4ofhu66rpuz7BM297',
          stateId: 'ar',
          status: 'revoked',
          createdAt: '2020-12-02T18:50:56.817Z',
          updatedAt: '2020-12-02T18:50:56.817Z',
          updatedById: '00u4nbo8e9BoctLWI297',
          role: 'eAPD State Staff',
          updatedBy: 'Regular User',
          displayName: 'Jesse James',
          email: 'jjames@fearless.tech'
        }
      ];
      getAffiliationsByUserId.withArgs('30').resolves(affiliations);

      await handler({ id: '12345', user: { id: '30' } }, res, next);

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(
        res.send.calledWith(affiliations),
        'Affiliation info is sent back'
      );
    });
  });
});
