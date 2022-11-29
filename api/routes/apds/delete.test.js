import tap from 'tap';
import { stub, match } from 'sinon';
import { can, userCanEditAPD } from '../../middleware/index.js';
import endpoint from './delete.js';
import mockExpress from '../../util/mockExpress.js';
import mockResponse from '../../util/mockResponse.js';

let app;
let req;
let res;
let next;
let deleteAPDByID;

tap.test('apds/:id DELETE endpoint', async endpointTest => {
  req = {
    meta: {
      apd: {
        id: 'apd id'
      }
    }
  };

  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
    deleteAPDByID = stub();
  });

  endpointTest.test('setup', async test => {
    endpoint(app);

    test.ok(
      app.delete.calledWith(
        '/apds/:id',
        can('view-document'),
        userCanEditAPD(),
        match.func
      ),
      'DELETE endpoint is registered'
    );
  });

  endpointTest.test('handles unexpected errors', async t => {
    endpoint(app, { deleteAPDByID });
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();
    const err = { error: 'err0r' };
    deleteAPDByID.rejects(err);

    await handler(req, res, next);

    t.ok(next.called, 'next is called');
    t.ok(next.calledWith(err), 'pass error to middleware');
  });

  endpointTest.test('updates the status and saves', async test => {
    endpoint(app, { deleteAPDByID });
    const handler = app.delete.args.find(args => args[0] === '/apds/:id').pop();

    deleteAPDByID.resolves();

    await handler(req, res);

    test.ok(deleteAPDByID.calledWith('apd id'), 'the right APD is deleted');
    test.ok(res.status.calledWith(204), 'HTTP status set to 204');
    test.ok(res.send.notCalled, 'no body is sent');
    test.ok(res.end.called, 'response is terminated');
  });
});
