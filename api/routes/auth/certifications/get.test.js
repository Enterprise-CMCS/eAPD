const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../../middleware');
const { loggedIn } = require('../../../middleware/auth');

const getEndpoint = require('./get');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;

tap.test('state certifications post endpoint', async getTest => {
  const di = {
    getStateAdminCertifications: sinon.stub()
  };

  getTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  getTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith(
        '/auth/certifications',
        loggedIn,
        can('view-state-certifications'),
        sinon.match.func
      ),
      '/auth/certifications POST endpoint is setup'
    );
  });

  getTest.test(
    'GET endpoint for returning the list of state admin certifications',
    async tests => {
      let handler;

      tests.beforeEach(async () => {
        getEndpoint(app, { ...di });
        handler = app.get.args
          .find(args => args[0] === '/auth/certifications')
          .pop();
      });

      tests.test('the db fails to respond', async test => {
        const err = { error: 'cant save' };
        di.getStateAdminCertifications.throws(err);

        await handler({}, res, next);

        test.ok(next.called, 'next is called');
        test.ok(next.calledWith(err), 'pass error to middleware');
      });

      tests.test('with valid response', async test => {
        const results = { some: 'result' };
        di.getStateAdminCertifications.resolves(results);

        await handler({}, res, next);

        test.ok(res.send.calledWith(results), 'sends a 200 success response');
      });
    }
  );
});
