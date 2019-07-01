const tap = require('tap');
const sinon = require('sinon');
const { can } = require('../../middleware/auth');

const del = require('./delete');

tap.test('files delete endpoint', async tests => {
  const sandbox = sinon.createSandbox();

  const app = { delete: sandbox.stub() };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  tests.test('setup', async test => {
    del(app);

    test.ok(
      app.delete.calledWith(
        '/files/contractor/:id/:fileID',
        can('create-draft'),
        sinon.match.func
      ),
      'files DELETE endpoint is registered'
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

    const FileModel = { fetch: sandbox.stub(), where: sandbox.stub() };

    const fileDB = {
      get: sandbox.stub(),
      destroy: sandbox.stub()
    };

    const rawDB = sandbox.stub();
    const rawWhere = sandbox.stub();
    const rawCount = sandbox.stub();
    const rawDel = sandbox.stub();

    const store = {
      remove: sandbox.stub()
    };

    const req = {
      params: { fileID: 'requested file id', id: 'requested contractor id' },
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
      del(app, { ContractorModel, FileModel, rawDB, store });
      handler = app.delete.args[0][app.delete.args[0].length - 1];

      ContractorModel.where.returns(ContractorModel);

      contractorDB.get.withArgs('id').returns('contractor id');
      contractorDB.related.withArgs('activity').returns(activityDB);
      activityDB.related.withArgs('apd').returns(apdDB);

      FileModel.where.returns(FileModel);
      FileModel.fetch.resolves(fileDB);
      fileDB.get.withArgs('key').returns('file key');

      rawDB.returns({ where: rawWhere });
      rawWhere.returns({ count: rawCount, del: rawDel });
      rawCount.resolves([{ count: 0 }]);

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
      'updates the database accordingly, but leaves the file if it is still linked to other things',
      async test => {
        ContractorModel.fetch.resolves(contractorDB);
        apdDB.get.returns(1);
        rawCount.resolves([{ count: 1 }]);

        await handler(req, res);

        test.ok(
          ContractorModel.where.calledWith({ id: 'requested contractor id' }),
          'restricts query to requested ID'
        );
        test.ok(
          rawDB.calledWith('activity_contractor_files'),
          'updates contractor/file link'
        );
        test.ok(
          rawWhere.calledWith({
            activity_contractor_resource_id: 'requested contractor id',
            file_id: 'requested file id'
          }),
          'specifically the requested contractor and file'
        );
        test.ok(rawDel.calledOnce, 'contractor/file link is deleted');
        test.ok(store.remove.notCalled, 'file is not removed from the store');
        test.ok(fileDB.destroy.notCalled, 'file is not removed from database');
        test.ok(res.status.calledWith(204), 'sends status 204');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    epTests.test(
      'deletes the file and updates the database accordingly',
      async test => {
        ContractorModel.fetch.resolves(contractorDB);
        apdDB.get.returns(1);

        await handler(req, res);

        test.ok(
          ContractorModel.where.calledWith({ id: 'requested contractor id' }),
          'restricts query to requested ID'
        );
        test.ok(
          rawDB.calledWith('activity_contractor_files'),
          'updates contractor/file link'
        );
        test.ok(
          rawWhere.calledWith({
            activity_contractor_resource_id: 'requested contractor id',
            file_id: 'requested file id'
          }),
          'specifically the requested contractor and file'
        );
        test.ok(rawDel.calledOnce, 'link is deleted');
        test.ok(
          FileModel.where.calledWith({ id: 'requested file id' }),
          'requested file is loaded for deletion'
        );
        test.ok(
          store.remove.calledWith('file key'),
          'file is removed from the store'
        );
        test.ok(fileDB.destroy.calledOnce, 'file is removed from database');
        test.ok(res.status.calledWith(204), 'sends status 204');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );
  });
});
