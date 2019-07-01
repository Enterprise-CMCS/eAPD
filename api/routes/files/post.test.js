const tap = require('tap');
const sinon = require('sinon');
const { can } = require('../../middleware/auth');

const post = require('./post');

tap.test('files post endpoint', async tests => {
  const sandbox = sinon.createSandbox();

  const app = { post: sandbox.stub() };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  tests.test('setup', async test => {
    const upload = {};
    const uploadCreator = { single: sinon.stub().returns(upload) };
    post(app, { uploadMiddleware: uploadCreator });

    test.ok(
      app.post.calledWith(
        '/files/contractor/:id',
        can('create-draft'),
        upload,
        sinon.match.func
      ),
      'files POST endpoint is registered'
    );
  });

  tests.test('endpoint handler tests', async epTests => {
    let handler;

    const ContractorModel = { where: sandbox.stub(), fetch: sandbox.stub() };

    const contractorDB = {
      get: sandbox.stub(),
      related: sandbox.stub()
    };

    const activityDB = {
      related: sandbox.stub()
    };

    const apdDB = {
      get: sandbox.stub()
    };

    const FileModel = {
      forge: sandbox.stub()
    };

    const fileDB = {
      get: sandbox.stub(),
      save: sandbox.stub(),
      toJSON: sandbox.stub()
    };

    const rawDB = sandbox.stub();
    const rawInsert = sandbox.stub();

    const store = {
      write: sandbox.stub()
    };

    const req = {
      params: { id: 'requested contractor id' },
      user: {
        model: {
          apds: sandbox.stub()
        }
      }
    };

    const res = {
      end: sandbox.stub(),
      send: sandbox.stub(),
      status: sandbox.stub()
    };

    epTests.beforeEach(async () => {
      post(app, { ContractorModel, FileModel, rawDB, store });
      handler = app.post.args[0][app.post.args[0].length - 1];

      ContractorModel.where.returns(ContractorModel);

      contractorDB.get.withArgs('id').returns('contractor id');
      contractorDB.related.withArgs('activity').returns(activityDB);
      activityDB.related.withArgs('apd').returns(apdDB);

      FileModel.forge.returns(fileDB);
      fileDB.get.withArgs('id').returns('file id');
      fileDB.toJSON.returns('file json');

      rawDB.returns({ insert: rawInsert });

      req.user.model.apds.resolves([1, 2, 3]);

      res.send.returns(res);
      res.status.returns(res);
    });

    epTests.test('handles a database error', async test => {
      ContractorModel.fetch.throws(new Error('boop'));
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'sends status 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    epTests.test(
      'handles where the contractor ID does not exist',
      async test => {
        ContractorModel.fetch.resolves(null);
        await handler(req, res);

        test.ok(
          ContractorModel.where.calledWith({ id: 'requested contractor id' }),
          'restricts query to requested ID'
        );
        test.ok(res.status.calledWith(404), 'sends status 404');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    epTests.test(
      'handles where the requestor does not have access to the APD containing the contractor',
      async test => {
        ContractorModel.fetch.resolves(contractorDB);
        // The APD IDs the user has access to are represented by
        // req.user.model.apds, mocked in the epTests beforeEach.
        // If this value is not in that list, we should get the 404.
        apdDB.get.returns(5);
        await handler(req, res);

        test.ok(
          ContractorModel.where.calledWith({ id: 'requested contractor id' }),
          'restricts query to requested ID'
        );
        test.ok(res.status.calledWith(404), 'sends status 404');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    epTests.test(
      'saves the file and updates the database accordingly',
      async test => {
        ContractorModel.fetch.resolves(contractorDB);
        apdDB.get.returns(1);

        store.write.resolves();
        fileDB.save.resolves();

        req.body = { metadata: 'this is metadata' };
        req.file = {
          buffer: {},
          size: 99
        };

        await handler(req, res);

        test.ok(
          ContractorModel.where.calledWith({ id: 'requested contractor id' }),
          'restricts query to requested ID'
        );
        test.ok(res.send.calledWith('file json'), 'sends the file JSON');
        test.ok(
          store.write.calledWith(sinon.match(/[0-9a-f]{12}/), req.file.buffer),
          'writes to store with key and file buffer'
        );
        const storedKey = store.write.args[0][0];
        test.ok(
          FileModel.forge.calledWith({
            key: storedKey,
            metadata: 'this is metadata',
            size: 99
          }),
          'new file model is created with the write information'
        );
        test.ok(
          rawDB.calledWith('activity_contractor_files'),
          'contractor file link updated'
        );
        test.ok(
          rawInsert.calledWith({
            activity_contractor_resource_id: 'contractor id',
            file_id: 'file id'
          }),
          'correct link is inserted'
        );
      }
    );
  });
});
