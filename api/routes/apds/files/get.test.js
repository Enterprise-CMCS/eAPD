const tap = require('tap');
const sinon = require('sinon');
const { can } = require('../../../middleware');
const endpoints = require('./get');

tap.test('apds files endpoints', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub(), post: sandbox.stub() };

  const di = {
    validateFile: sandbox.stub(),
    createNewFileForAPD: sandbox.stub(),
    deleteFileByID: sandbox.stub(),
    fileBelongsToAPD: sandbox.stub(),
    getFile: sandbox.stub(),
    putFile: sandbox.stub()
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  const next = sandbox.stub();

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
      app.get.calledWith(
        '/apds/:id/files/:fileID',
        can('view-document'),
        sinon.match.func
      ),
      'endpoint for fetching APD files is setup'
    );
  });

  endpointTest.test('GET endpoint for fetching an APD file', async tests => {
    let handler;
    tests.beforeEach(async () => {
      endpoints(app, { ...di });
      handler = app.get.args[0].pop();
    });

    tests.test(
      'there is an unexpected error checking if the file belongs to the APD',
      async test => {
        const error = new Error('some error');
        di.fileBelongsToAPD.rejects(error);

        await handler(
          { params: { fileID: 'file id', id: 'apd id' } },
          res,
          next
        );

        test.ok(next.calledWith(error));
      }
    );

    tests.test('the requested file does not belong to the APD', async test => {
      di.fileBelongsToAPD.resolves(false);

      await handler({ params: { fileID: 'file id', id: 'apd id' } }, res, next);

      test.ok(res.status.calledWith(400), 'sends a 400 error');
      test.ok(res.end.calledAfter(res.status), 'response is terminated');
    });

    tests.test('there is an unexpected error getting the file', async test => {
      const error = new Error('some other error');
      di.fileBelongsToAPD.resolves(true);
      di.getFile.rejects(error);

      await handler({ params: { fileID: 'file id', id: 'apd id' } }, res, next);

      test.ok(next.calledWith(error));
    });

    tests.test(
      'the file belongs to the APD and there is no trouble getting it',
      async test => {
        const file = Buffer.from('some file');
        di.fileBelongsToAPD.resolves(true);
        di.getFile.resolves(file);

        await handler(
          { params: { fileID: 'file id', id: 'apd id' } },
          res,
          next
        );

        test.ok(
          res.end.calledWith(file),
          'sends the file and response is terminated'
        );
      }
    );
  });
});
