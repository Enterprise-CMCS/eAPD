const tap = require('tap');
const sinon = require('sinon');

const loggedIn = require('../..//middleware').loggedIn;
const getEndpoint = require('./get');

tap.test('files GET endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub()
  };

  const req = {
    params: {
      key: 'file key'
    },
    user: {
      model: {
        apds: sandbox.stub()
      }
    }
  };

  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  const FileModel = {
    fetch: sandbox.stub(),
    where: sandbox.stub()
  };

  const store = {
    exists: sandbox.stub(),
    getReadStream: sandbox.stub()
  };

  endpointTest.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    FileModel.where.returns(FileModel);
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/files/:key', loggedIn, sinon.match.func),
      'me GET endpoint is registered'
    );
  });

  endpointTest.test('get files handler', async handlerTest => {
    getEndpoint(app, { FileModel, store });
    const handler = app.get.args.filter(arg => arg[0] === '/files/:key')[0][2];

    handlerTest.test('handles a database error', async test => {
      FileModel.fetch.rejects();
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'sends an HTTP 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    handlerTest.test(
      'handles when the file is not in the database',
      async test => {
        FileModel.fetch.resolves(false);

        await handler(req, res);

        test.ok(res.status.calledWith(404), 'sends an HTTP 404');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'handles when the file is not in the store',
      async test => {
        FileModel.fetch.resolves({});
        store.exists.resolves(false);

        await handler(req, res);

        test.ok(res.status.calledWith(404), 'sends an HTTP 404');
        test.ok(res.end.calledOnce, 'response is terminated');
      }
    );

    handlerTest.test(
      'when the file exists in the database and the store',
      async existTests => {
        const file = {
          related: sandbox.stub()
        };
        const pipe = sandbox.spy();

        existTests.beforeEach(async () => {
          FileModel.fetch.resolves(file);
          store.exists.resolves(true);

          store.getReadStream.returns({ pipe });

          // File is associated with APD id 1 via activities
          file.related.withArgs('activities').returns([
            {
              related: sandbox
                .stub()
                .withArgs('apd')
                .returns({
                  get: sandbox
                    .stub()
                    .withArgs('id')
                    .returns(1)
                })
            }
          ]);

          // File is associated with APD id 2 via contractors
          file.related.withArgs('contractors').returns([
            {
              related: sandbox
                .stub()
                .withArgs('activity')
                .returns({
                  related: sandbox
                    .stub()
                    .withArgs('apd')
                    .returns({
                      get: sandbox
                        .stub()
                        .withArgs('id')
                        .returns(2)
                    })
                })
            }
          ]);
        });

        existTests.test(
          'user does not have access to any APD this file is associated with',
          async test => {
            req.user.model.apds.returns([3]);

            await handler(req, res);

            test.ok(res.status.calledWith(404), 'sends an HTTP 404');
            test.ok(res.end.calledOnce, 'response is terminated');
          }
        );

        existTests.test(
          'user has access to an APD via activities',
          async test => {
            req.user.model.apds.returns([1]);

            await handler(req, res);

            test.ok(
              store.getReadStream.calledOnce,
              'only one read stream is fetched'
            );
            test.ok(
              store.getReadStream.calledWith('file key'),
              'read stream is fetched with correct key'
            );
            test.ok(
              pipe.calledWith(res),
              'the file is piped into the response'
            );
          }
        );

        existTests.test(
          'user has access to an APD via contractors',
          async test => {
            req.user.model.apds.returns([2]);

            await handler(req, res);

            test.ok(
              store.getReadStream.calledOnce,
              'only one read stream is fetched'
            );
            test.ok(
              store.getReadStream.calledWith('file key'),
              'read stream is fetched with correct key'
            );
            test.ok(
              pipe.calledWith(res),
              'the file is piped into the response'
            );
          }
        );
      }
    );
  });
});
