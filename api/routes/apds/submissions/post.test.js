import tap from 'tap';
import { stub, match } from 'sinon';

import postEndpoint from './post.js';
import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;
let updateAPDReviewStatus;

tap.test('apds/submissions POST endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
    updateAPDReviewStatus = stub();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith('/apds/submissions', match.func),
      'apds/submissions POST endpoint is registered'
    );
  });

  endpointTest.test('post apds/submissions handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      postEndpoint(app, { updateAPDReviewStatus });
      handler = app.post.args
        .find(args => args[0] === '/apds/submissions')
        .pop();
    });

    tests.test('invalid api key', async test => {
      const req = {
        headers: {}
      };
      await handler(req, res, next);
      console.log({ res });
      test.ok(res.status.calledWith(403));
    });

    tests.test('invalid body', async test => {
      const req = {
        headers: { apikey: 'good api key' },
        body: 'bad body'
      };
      await handler(req, res, next);
      test.ok(res.status.calledWith(400));
    });

    tests.test('body valid', async test => {
      const status = [
        { apdId: 'apd id', updatedStatus: 'approved', success: true }
      ];
      updateAPDReviewStatus.returns(status);
      const req = {
        headers: { apikey: 'good api key' },
        body: [{ apdId: 'apd id', newStatus: 'completed' }]
      };
      await handler(req, res, next);
      test.ok(res.send.calledWith(status));
    });
  });
});
