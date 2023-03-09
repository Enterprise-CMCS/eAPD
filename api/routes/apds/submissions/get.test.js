import tap from 'tap';
import { stub, match } from 'sinon';
import getEndpoint from './get.js';

import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;
let getAllSubmittedAPDs;

tap.test('apds/submissions GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
    getAllSubmittedAPDs = stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/apds/submissions', match.func),
      'apds/submissions GET endpoint is registered'
    );
  });

  endpointTest.test('get apds/submissions handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      getEndpoint(app, { getAllSubmittedAPDs });
      handler = app.get.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('no apikey', async test => {
      const req = { headers: {} };
      await handler(req, res, next);
      test.ok(res.status.calledWith(403));
    });

    tests.test('good apikey', async test => {
      getAllSubmittedAPDs.returns({ apdID: 'apd id' });
      const req = {
        headers: { apikey: 'good api key' }
      };
      await handler(req, res, next);
      test.ok(res.send.calledWith({ apdID: 'apd id' }));
    });
  });
});
