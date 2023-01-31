import tap from 'tap';
import { stub, match } from 'sinon';
import getEndpoint from './get.js';

import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;
let getAllSubmittedAPDs;
let getLaunchDarklyFlag;

tap.test('apds/submissions GET endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
    getAllSubmittedAPDs = stub();
    getLaunchDarklyFlag = stub();
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
      getEndpoint(app, { getAllSubmittedAPDs, getLaunchDarklyFlag });
      handler = app.get.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('flag off', async test => {
      const req = {
        headers: {},
        ip: 'bad ip' // bad ip
      };
      getLaunchDarklyFlag.returns(false);
      await handler(req, res, next);
      test.ok(res.status.calledWith(403));
    });

    tests.test('flag on', async test => {
      getLaunchDarklyFlag.returns(true);
      getAllSubmittedAPDs.returns({ apdID: 'apd id' });
      const req = {
        headers: {},
        ip: '10.0.0.0' // good ip
      };
      await handler(req, res, next);
      test.ok(res.send.calledWith({ apdID: 'apd id' }));
    });
  });
});
