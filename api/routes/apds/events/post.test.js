import tap from 'tap';
import { createSandbox, match } from 'sinon';
import { can, userCanAccessAPD } from '../../../middleware/index.js';
import endpoints from './post.js';

tap.test('apds events endpoints', async endpointTest => {
  const sandbox = createSandbox();
  const app = { post: sandbox.stub() };

  const di = {
    createEventForAPD: sandbox.stub()
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    endpoints(app);

    setupTest.ok(
      app.post.calledWith(
        '/apds/:id/events',
        can('view-document'),
        userCanAccessAPD(),
        match.func
      ),
      'endpoint for posting APD events is setup'
    );
  });

  endpointTest.test(
    'POST endpoint for recording an event on an APD',
    async tests => {
      let handler;

      const req = {
        body: { eventType: 'EXPORT' },
        params: { id: '42' },
        user: { id: 'user id' }
      };

      tests.beforeEach(async () => {
        endpoints(app, { ...di });
        handler = app.post.args[0].pop();
      });

      tests.test('the APD id is invalid', async test => {
        di.createEventForAPD.resolves(null);

        await handler({ ...req, params: { id: 'bad id' } }, res);

        test.ok(
          di.createEventForAPD.calledWith({
            userID: 'user id',
            apdID: 'bad id',
            eventType: 'EXPORT',
            metadata: null
          }),
          'database record was not created from the request data'
        );
        test.ok(res.status.calledWith(400), 'sends a 400 error');
        test.ok(res.end.calledAfter(res.status), 'response is terminated');
      });

      tests.test(
        'there is an unexpected error creating the event in the database',
        async test => {
          di.createEventForAPD.resolves(null);

          await handler(req, res);

          test.ok(
            di.createEventForAPD.calledWith({
              userID: 'user id',
              apdID: '42',
              eventType: 'EXPORT',
              metadata: null
            }),
            'database record is created from the request data'
          );
          test.ok(res.status.calledWith(400), 'sends a 400 error');
          test.ok(res.end.calledAfter(res.status), 'response is terminated');
        }
      );

      tests.test('the event is created and stored correctly', async test => {
        di.createEventForAPD.resolves('new event ID');

        await handler(req, res);

        test.ok(
          di.createEventForAPD.calledWith({
            userID: 'user id',
            apdID: '42',
            eventType: 'EXPORT',
            metadata: null
          }),
          'database record is created from the request data'
        );
        test.ok(res.send.calledWith({ success: true }), 'sends successful');
      });
    }
  );
});
