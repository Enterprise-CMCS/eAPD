const tap = require('tap');
const sinon = require('sinon');

const { can, userCanEditAPD } = require('../../middleware');
const patchEndpoint = require('./patch');

tap.test('apds PATCH endpoint', async tests => {
  const sandbox = sinon.createSandbox();
  let handler;

  const app = {
    patch: sandbox.spy()
  };

  const getAPDByID = sandbox.stub();
  const patchObject = sandbox.stub();
  const updateAPDDocument = sandbox.stub();
  const validate = sandbox.stub();

  const res = {
    end: sandbox.spy(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.send.returns(res);
    res.status.returns(res);

    validate.errors = [];

    patchEndpoint(app, {
      getAPDByID,
      patchObject,
      updateAPDDocument,
      validate
    });
    handler = app.patch.args[0][app.patch.args[0].length - 1];
  });

  tests.test('sets up the endpoint with the server', async test => {
    patchEndpoint(app);
    test.ok(
      app.patch.calledWith(
        '/apds/:id',
        can('edit-document'),
        userCanEditAPD(),
        sinon.match.func
      ),
      'creates a PATCH endpoint at the right location with the right permissions'
    );
  });

  tests.test('handles the case where an APD ID is not provided', async test => {
    await handler({ params: {} }, res);

    test.ok(res.status.calledWith(422), 'sends an HTTP 422 status');
  });

  tests.test(
    'handles the case where the message body is not an array',
    async test => {
      await handler({ params: { id: 'apd id' } }, res);

      test.ok(res.status.calledWith(422), 'sends an HTTP 422 status');
      test.ok(res.end.calledAfter(res.status), 'response is terminated');
    }
  );

  tests.test('fails gracefully on arbitrary database error', async test => {
    getAPDByID.throws(new Error('fake error'));
    await handler({ body: [], params: { id: 'apd id' } }, res);

    test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
    test.ok(res.end.calledAfter(res.status), 'response is terminated');
  });

  tests.test(
    'fails gracefully if there is an error patching the document',
    async test => {
      getAPDByID.resolves({ document: 'old document' });
      patchObject.throws(new Error('fake error'));

      const patches = [{ value: 'patch 1' }, { value: 'patch 2' }];

      await handler({ body: patches, params: { id: 'apd id' } }, res);

      test.ok(patchObject.calledWith('old document', patches));
      test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
      test.ok(res.end.calledAfter(res.status), 'response is terminated');
    }
  );

  tests.test('fails if there are validation errors', async test => {
    const patchedDocument = {
      key1: {
        key2: {
          key3: 'value 1',
          key4: 'value 2'
        }
      }
    };

    getAPDByID.resolves({ document: 'old document' });
    patchObject.returns(patchedDocument);
    validate.returns(false);
    validate.errors = [
      { dataPath: '/key1/key2/key3', message: 'validation error' }
    ];

    const patches = [{ value: 'patch 1' }, { value: 'patch 2' }];

    await handler({ body: patches, params: { id: 'apd id' } }, res);

    test.ok(patchObject.calledWith('old document', patches), 'applies patches');
    test.ok(validate.calledWith(patchedDocument), 'validates the new document');
    test.ok(res.status.calledWith(422), 'sends an HTTP 422 status');
    test.ok(
      res.send.calledWith([{ path: '/key1/key2/key3' }]),
      'sends back the list of invalid paths'
    );
    test.ok(
      res.send.calledAfter(res.status),
      'response is sent after the status'
    );
    test.ok(res.end.calledAfter(res.send), 'response is terminated');
  });

  tests.test('saves the updated document if everything is good', async test => {
    getAPDByID.resolves({
      created_at: 'created at',
      document: 'old document',
      state_id: 'state id',
      status: 'status'
    });
    const patchedDocument = { key1: 'value 1' };
    patchObject.returns(patchedDocument);
    validate.returns(true);
    updateAPDDocument.resolves('update time');

    const patches = [{ path: 'path 1' }, { path: 'path 2' }];

    await handler({ body: patches, params: { id: 'apd id' } }, res);

    test.ok(
      updateAPDDocument.calledWith('apd id', 'state id', patchedDocument),
      'updates the right set of things'
    );

    test.ok(
      res.send.calledWith({
        ...patchedDocument,
        created: 'created at',
        id: 'apd id',
        state: 'state id',
        status: 'status',
        updated: 'update time'
      })
    );
  });
});
