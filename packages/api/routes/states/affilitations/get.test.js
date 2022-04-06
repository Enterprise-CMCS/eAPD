const tap = require('tap');
const sinon = require('sinon');

const can = require('../../../middleware').can;
const validForState = require('../../../middleware').validForState;

const getEndpoint = require('./get');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;

tap.test('GET /states/:stateId/affiliations', async endpointTest => {
  let getPopulatedAffiliationsByStateId;

  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getPopulatedAffiliationsByStateId = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith(
        '/states/:stateId/affiliations',
        can('view-affiliations'),
        validForState('stateId'),
        sinon.match.func
      ),
      'state-specific affiliations GET endpoint is registered'
    );
  });

  endpointTest.test('get all affiliations handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, {
        getPopulatedAffiliationsByStateId
      });
      handler = app.get.args.find(
        args => args[0] === '/states/:stateId/affiliations'
      )[3];
    });

    handlerTest.test('database error', async invalidTest => {
      const err = { error: 'err0r' };
      getPopulatedAffiliationsByStateId.rejects(err);

      await handler(
        { params: { stateId: 'ar' }, query: {}, user: { state: { id: 'ar' } } },
        res,
        next
      );

      invalidTest.ok(next.called, 'next is called');
      invalidTest.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test('sends pending affiliations', async test => {
      const pending = [
        {
          id: 29,
          userId: '00u4oerp8sl6vtG3y297',
          stateId: 'ar',
          status: 'requested',
          createdAt: '2020-12-02T18:30:54.477Z',
          updatedAt: '2020-12-02T18:30:54.477Z',
          updatedById: null,
          role: null,
          updatedBy: null,
          displayName: 'Ty Bolchoz',
          email: 'tbolchoz@fearless.tech',
          secondEmail: null,
          primaryPhone: '4438664337',
          mobilePhone: null
        },
        {
          id: 28,
          userId: '00u5jkmqzqkGveBeO297',
          stateId: 'ar',
          status: 'requested',
          createdAt: '2020-12-02T18:30:54.477Z',
          updatedAt: '2020-12-02T18:30:54.477Z',
          updatedById: null,
          role: null,
          updatedBy: null,
          displayName: 'MFA User',
          email: 'tforkner+testmfa@fearless.tech',
          secondEmail: null,
          primaryPhone: '5555555555',
          mobilePhone: null
        }
      ];
      getPopulatedAffiliationsByStateId.returns(pending);

      await handler(
        {
          params: { stateId: 'ar' },
          query: { status: 'pending' },
          user: { state: { id: 'ar' } }
        },
        res
      );

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(
        res.json.calledWith(pending),
        'Pending Affiliation info is sent back'
      );
    });
  });
});

tap.test('GET /states/:stateId/affiliations/:id', async tests => {
  let getPopulatedAffiliationById;

  tests.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getPopulatedAffiliationById = sinon.stub();
  });

  tests.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith(
        '/states/:stateId/affiliations/:id',
        can('view-affiliations'),
        validForState('stateId'),
        sinon.match.func
      ),
      'specific affiliation GET endpoint is registered'
    );
  });

  tests.test('get single affiliation handler', async handlerTest => {
    let handler;
    handlerTest.beforeEach(() => {
      getEndpoint(app, { getPopulatedAffiliationById });
      handler = app.get.args.find(
        args => args[0] === '/states/:stateId/affiliations/:id'
      )[3];
    });

    handlerTest.test('database error', async t => {
      const err = { error: 'err0r' };
      getPopulatedAffiliationById.rejects(err);

      await handler(
        { params: { stateId: 'ar', id: '1' }, user: { state: { id: 'ar' } } },
        res,
        next
      );

      t.ok(next.called, 'next is called');
      t.ok(next.calledWith(err), 'pass error to middleware');
    });

    handlerTest.test(
      'sends a not found error if there is no valid Affiliation',
      async test => {
        getPopulatedAffiliationById.returns(undefined);

        await handler(
          {
            params: { stateId: 'ar', id: '100' },
            user: { state: { id: 'ar' } }
          },
          res,
          next
        );

        test.ok(res.status.calledWith(404), 'HTTP status set to 404');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    handlerTest.test('sends affiliation', async test => {
      const affiliation = {
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
        email: 'jjames@fearless.tech',
        secondEmail: null,
        primaryPhone: '1111111111',
        mobilePhone: null
      };
      getPopulatedAffiliationById.returns(affiliation);

      await handler(
        { params: { stateId: 'ar', id: '30' }, user: { state: { id: 'ar' } } },
        res
      );

      test.ok(res.status.notCalled, 'HTTP status not explicitly set');
      test.ok(
        res.json.calledWith(affiliation),
        'Affiliation info is sent back'
      );
    });
  });
});
