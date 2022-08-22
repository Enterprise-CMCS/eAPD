const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../../middleware');
const { loggedIn } = require('../../../middleware/auth');

const postEndpoint = require('./post');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;

tap.test('state certifications post endpoint', async postTest => {
  const di = {
    addStateAdminCertification: sinon.stub()
  };

  postTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  postTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith(
        '/auth/certifications',
        loggedIn,
        can('edit-state-certifications'),
        sinon.match.func
      ),
      '/auth/certifications POST endpoint is setup'
    );
  });

  postTest.test(
    'POST endpoint for handing submission of state certification forms',
    async tests => {
      let handler;
      const req = {
        body: {
          ffy: 2021,
          name: 'Test Name',
          email: 'test@email.com',
          phone: '4105555555',
          state: 'MD'
        },
        user: {
          id: '123'
        }
      };

      tests.beforeEach(async () => {
        postEndpoint(app, { ...di });
        handler = app.post.args
          .find(args => args[0] === '/auth/certifications')
          .pop();
      });

      tests.test('the db fails to save', async test => {
        di.addStateAdminCertification.resolves({ error: 'cant save' });

        await handler(req, res, next);

        test.ok(res.status.calledWith(400), 'sends a 400 error');
        test.ok(res.end.calledAfter(res.status), 'response is terminated');
      });

      tests.test('with valid data', async test => {
        di.addStateAdminCertification.resolves({});

        await handler(req, res, next);

        test.ok(res.status.calledWith(200), 'sends a 200 success response');
      });
    }
  );
});
