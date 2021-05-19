const tap = require('tap');
const sinon = require('sinon');
const { can, userCanEditAPD } = require('../../middleware');
const endpoints = require('./files');

tap.only('apds files endpoints', async endpointTest => {
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

    setupTest.ok(
      app.post.calledWith(
        '/apds/:id/files',
        can('view-document'),
        userCanEditAPD(),
        sinon.match.func
      ),
      'endpoint for posting APD files is setup'
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
        const file = {};
        di.fileBelongsToAPD.resolves(true);
        di.getFile.resolves(file);

        await handler(
          { params: { fileID: 'file id', id: 'apd id' } },
          res,
          next
        );

        test.ok(res.send.calledWith(file), 'sends the file');
        test.ok(res.end.calledAfter(res.send), 'response is terminated');
      }
    );
  });

  endpointTest.test('POST endpoint for uploading an APD file', async tests => {
    let handler;

    const req = {
      body: { metadata: 'some metadata' },
      params: { id: 'apd id' }
    };

    tests.beforeEach(async () => {
      endpoints(app, { ...di });
      handler = app.post.args[0].pop();
    });

    tests.test('the file is a text file', async test => {
      di.validateFile.resolves({
        error: 'User is trying to upload a text-based file'
      });
      req.file = {
        buffer: 'text file buffer',
        size: 1234
      };

      await handler(req, res, next);

      test.ok(res.status.calledWith(415), 'sends a 415 error');
      test.ok(
        res.send.calledWith({
          error: 'User is trying to upload a text-based file'
        })
      );
      test.ok(res.send.calledAfter(res.status), 'response is terminated');
    });

    tests.test('the file is not an image', async test => {
      di.validateFile.resolves({
        error: 'User is trying to upload a file type of application/pdf'
      });
      req.file = {
        buffer: 'pdf file buffer',
        size: 1234
      };

      await handler(req, res, next);
      test.ok(res.status.calledWith(415), 'sends a 415 error');
      test.ok(
        res.send.calledWith({
          error: 'User is trying to upload a file type of application/pdf'
        })
      );
      test.ok(res.send.calledAfter(res.status), 'response is terminated');
    });

    tests.test(
      'there is an unexpected error creating the file in the database',
      async test => {
        req.file = {
          buffer: 'image file buffer',
          size: 1234
        };

        di.validateFile.resolves({ image: 'image file buffer' });
        di.createNewFileForAPD.rejects(new Error('some error'));

        await handler(req, res, next);

        test.ok(
          di.createNewFileForAPD.calledWith(
            'image file buffer',
            'apd id',
            'some metadata',
            1234
          ),
          'database record is created from the request data'
        );
        test.ok(
          next.calledWith({ message: 'Unable to upload file' }),
          'sends error message'
        );
      }
    );

    tests.test(
      'there is an unexpected error putting the file in storage',
      async test => {
        di.validateFile.resolves({ image: 'image file buffer' });
        req.file = {
          buffer: 'image file buffer',
          size: 1234
        };
        di.createNewFileForAPD.resolves('new file ID');
        di.putFile.rejects(new Error('some other error'));

        await handler(req, res, next);

        test.ok(
          di.createNewFileForAPD.calledWith(
            'image file buffer',
            'apd id',
            'some metadata',
            1234
          ),
          'database record is created from the request data'
        );
        test.ok(
          di.putFile.calledWith('new file ID', 'image file buffer'),
          'the file is put into storage from the request data and the database ID'
        );
        test.ok(
          di.deleteFileByID.calledWith('new file ID'),
          'file is removed from the database'
        );
        test.ok(
          next.calledWith({ message: 'Unable to upload file' }),
          'sends error message'
        );
      }
    );

    tests.test('the file is created and stored correctly', async test => {
      di.validateFile.resolves({ image: 'image file buffer' });
      req.file = {
        buffer: 'image file buffer',
        size: 1234
      };
      di.createNewFileForAPD.resolves('new file ID');
      di.putFile.resolves();

      await handler(req, res, next);

      test.ok(
        di.createNewFileForAPD.calledWith(
          'image file buffer',
          'apd id',
          'some metadata',
          1234
        ),
        'database record is created from the request data'
      );
      test.ok(
        di.putFile.calledWith('new file ID', 'image file buffer'),
        'the file is put into storage from the request data and the database ID'
      );
      test.ok(
        res.send.calledWith({ url: '/apds/apd id/files/new file ID' }),
        'sends the file URL'
      );
    });
  });
});
