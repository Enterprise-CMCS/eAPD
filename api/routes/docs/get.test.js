import tap from 'tap';
import sinon from 'sinon';
import getEndpoint from './get';
import mockExpress from '../../util/mockExpress';
import mockResponse from '../../util/mockResponse';

let app;
let res;
let next;
let getFile;

tap.test('docs endpoints', async endpointTest => {
  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getFile = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/docs/account-registration', sinon.match.func),
      'endpoint for fetching account registration doc is setup'
    );
    setupTest.ok(
      app.get.calledWith('/docs/system-access', sinon.match.func),
      'endpoint for fetching system access doc is setup'
    );
  });

  endpointTest.test(
    'GET endpoint for fetching account registration doc',
    async handlerTest => {
      let handler;
      handlerTest.beforeEach(() => {
        getEndpoint(app, { getFile });
        handler = app.get.args.find(
          args => args[0] === '/docs/account-registration'
        )[1];
      });

      handlerTest.test(
        'there is an unexpected error getting the account registration doc',
        async invalidTest => {
          const err = new Error('some other error');
          getFile.rejects(err);

          await handler({ params: {} }, res, next);

          invalidTest.ok(next.called, 'next is called');
          invalidTest.ok(next.calledWith(err), 'pass error to middleware');
        }
      );

      handlerTest.test(
        'successfully received account registration doc',
        async validTest => {
          const file = {};
          getFile.resolves(file);

          await handler({ params: {} }, res, next);

          validTest.ok(res.send.calledWith(file), 'sends the file');
          validTest.ok(res.end.calledAfter(res.send), 'response is terminated');
        }
      );
    }
  );

  endpointTest.test(
    'GET endpoint for fetching system access doc',
    async handlerTest => {
      let handler;
      handlerTest.beforeEach(async () => {
        getEndpoint(app, { getFile });
        handler = app.get.args.find(
          args => args[0] === '/docs/system-access'
        )[1];
      });

      handlerTest.test(
        'there is an unexpected error getting the system access doc',
        async invalidTest => {
          const err = new Error('some other error');
          getFile.rejects(err);

          await handler({ params: {} }, res, next);

          invalidTest.ok(next.called, 'next is called');
          invalidTest.ok(next.calledWith(err), 'pass error to middleware');
        }
      );

      handlerTest.test(
        'successfully received system access doc',
        async validTest => {
          const file = {};
          getFile.resolves(file);

          await handler({ params: {} }, res, next);

          validTest.ok(res.send.calledWith(file), 'sends the file');
          validTest.ok(res.end.calledAfter(res.send), 'response is terminated');
        }
      );
    }
  );
});
