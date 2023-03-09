import tap from 'tap';
import { stub, match } from 'sinon';

import postEndpoint from './post.js';
import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;
let updateAPDReviewStatus;
let getLaunchDarklyFlag;

tap.test('apds/submissions PATCH endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
    updateAPDReviewStatus = stub();
    getLaunchDarklyFlag = stub();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith('/apds/submissions', match.func),
      'apds/submissions PATCH endpoint is registered'
    );
  });

  endpointTest.test('post apds/submissions handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      postEndpoint(app, { updateAPDReviewStatus, getLaunchDarklyFlag });
      handler = app.post.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('flag off', async test => {
      const req = {
        headers: {},
        ip: 'bad ip'
      };
      getLaunchDarklyFlag.returns(false);
      await handler(req, res, next);
      test.ok(res.status.calledWith(403));
    });

    tests.test('invalid body', async test => {
      const req = {
        headers: {},
        ip: '127.0.0.1',
        body: 'bad body'
      };
      getLaunchDarklyFlag.returns(true);
      await handler(req, res, next);
      test.ok(res.status.calledWith(400));
    });

    tests.test('flag on, body valid', async test => {
      getLaunchDarklyFlag.returns(true);
      const status = [
        { apdId: 'apd id', updatedStatus: 'approved', success: true }
      ];
      updateAPDReviewStatus.returns(status);
      const req = {
        headers: {},
        ip: '127.0.0.1',
        body: [{ apdId: 'apd id', newStatus: 'completed' }]
      };
      await handler(req, res, next);
      test.ok(res.send.calledWith(status));
    });
  });
});
