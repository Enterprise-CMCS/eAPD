const tap = require('tap');
const sinon = require('sinon');

const getEndpoint = require('./get');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;
let next;
let getFile;

tap.test('docs endpoints', async endpointTest => {
  endpointTest.beforeEach(done => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
    getFile = sinon.stub();
    done();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/docs/account-registration', sinon.match.func),
      'endpoint for fetching account registration doc is setup'
    );
  });

  endpointTest.test(
    'GET endpoint for fetching account registration doc',
    async handlerTest => {
      let handler;
      handlerTest.beforeEach(done => {
        getEndpoint(app, { getFile });
        handler = app.get.args.find(
          args => args[0] === '/docs/account-registration'
        )[1];
        done();
      });

      handlerTest.test(
        'there is an unexpected error getting the account registration doc',
        async invalidTest => {
          const err = { error: 'err0r' };
          getFile.rejects(err);

          await handler({ params: {}, user: {} }, res, next);

          invalidTest.ok(next.called, 'next is called');
          invalidTest.ok(next.calledWith(err), 'pass error to middleware');
        }
      );

      handlerTest.test(
        'successfully received account registration doc',
        async validTest => {
          const file = {};
          getFile.resolves(file);

          await handler({ params: {}, user: {} }, res, next);

          validTest.ok(res.send.calledWith(file), 'sends the file');
          validTest.ok(res.end.calledAfter(res.send), 'response is terminated');
        }
      );
    }
  );
});
