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

  const db = sandbox.stub();
  const dbReturns = {
    first: sandbox.stub(),
    update: sandbox.stub(),
    where: sandbox.stub()
  };

  const patchObject = sandbox.stub();

  const validateApd = sandbox.stub();

  const res = {
    end: sandbox.spy(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    db.returns(dbReturns);
    dbReturns.where.returns(dbReturns);

    res.send.returns(res);
    res.status.returns(res);

    validateApd.errors = [];

    patchEndpoint(app, { db, patchObject, validateApd });
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

    test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
  });

  tests.test(
    'handles the case where the message body is not an array',
    async test => {
      await handler({ params: { id: 'apd id' } }, res);

      test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
      test.ok(res.end.calledAfter(res.status), 'response is terminated');
    }
  );

  tests.test('fails gracefully on arbitrary database error', async test => {
    db.throws(new Error('fake error'));
    await handler({ body: [], params: { id: 'apd id' } }, res);

    test.ok(res.status.calledWith(500), 'sends an HTTP 500 status');
    test.ok(res.end.calledAfter(res.status), 'response is terminated');
  });

  tests.test(
    'fails gracefully if there is an error patching the document',
    async test => {
      dbReturns.first.resolves({ document: 'old document' });
      patchObject.throws(new Error('fake error'));

      const patches = ['patch 1', 'patch 2'];

      await handler({ body: patches, params: { id: 'apd id' } }, res);

      test.ok(db.calledWith('apds'), 'queries the apds table');
      test.ok(
        dbReturns.where.calledWith('id', 'apd id'),
        'just for the requested apd'
      );
      test.ok(
        dbReturns.first.calledWith('document', 'state_id', 'status'),
        'gets just the relevant fields'
      );
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

    dbReturns.first.resolves({ document: 'old document' });
    patchObject.returns(patchedDocument);
    validateApd.returns(false);
    validateApd.errors = [
      { dataPath: '/key1/key2/key3', message: 'validation error' }
    ];

    const patches = ['patch 1', 'patch 2'];

    await handler({ body: patches, params: { id: 'apd id' } }, res);

    test.ok(db.calledWith('apds'), 'queries the apds table');
    test.ok(
      dbReturns.where.calledWith('id', 'apd id'),
      'just for the requested apd'
    );
    test.ok(
      dbReturns.first.calledWith('document', 'state_id', 'status'),
      'gets just the relevant fields'
    );
    test.ok(patchObject.calledWith('old document', patches), 'applies patches');
    test.ok(
      validateApd.calledWith(patchedDocument),
      'validates the new document'
    );
    test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
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
    dbReturns.first.resolves({
      document: 'old document',
      state_id: 'state id',
      status: 'status'
    });
    const patchedDocument = { key1: 'value 1' };
    patchObject.returns(patchedDocument);
    validateApd.returns(true);
    const patches = [{ path: 'path 1' }, { path: 'path 2' }];

    await handler({ body: patches, params: { id: 'apd id' } }, res);

    test.ok(db.calledWith('apds'), 'queries the apds table');
    test.ok(
      dbReturns.where.calledWith('id', 'apd id'),
      'just for the requested apd'
    );
    test.ok(
      dbReturns.first.calledWith('document', 'state_id', 'status'),
      'gets just the relevant fields'
    );
    test.ok(patchObject.calledWith('old document', patches), 'applies patches');
    test.ok(
      validateApd.calledWith(patchedDocument),
      'validates the new document'
    );
    test.ok(db.calledWith('apds'), 'updates the apds table');
    test.ok(
      dbReturns.where.calledWith('id', 'apd id'),
      'just for the requested apd'
    );
    test.ok(
      dbReturns.update.calledWith({
        document: patchedDocument,
        updated_at: sinon.match.string
      }),
      'updates the relevant fields'
    );
    test.ok(
      res.send.calledWith({
        ...patchedDocument,
        id: 'apd id',
        state: 'state id',
        status: 'status',
        updated: sinon.match.string
      })
    );
  });

  tests.test(
    'saves the updated document and updates the state profile if everything is good',
    async test => {
      dbReturns.first.resolves({
        document: 'old document',
        state_id: 'state id',
        status: 'status'
      });
      const patchedDocument = { stateProfile: 'new state profile' };
      patchObject.returns(patchedDocument);
      validateApd.returns(true);
      const patches = [{ path: '/stateProfile/name' }, { path: 'path 2' }];

      await handler({ body: patches, params: { id: 'apd id' } }, res);

      test.ok(db.calledWith('apds'), 'queries the apds table');
      test.ok(
        dbReturns.where.calledWith('id', 'apd id'),
        'just for the requested apd'
      );
      test.ok(
        dbReturns.first.calledWith('document', 'state_id', 'status'),
        'gets just the relevant fields'
      );
      test.ok(
        patchObject.calledWith('old document', patches),
        'applies patches'
      );
      test.ok(
        validateApd.calledWith(patchedDocument),
        'validates the new document'
      );
      test.ok(db.calledWith('apds'), 'updates the apds table');
      test.ok(
        dbReturns.where.calledWith('id', 'apd id'),
        'just for the requested apd'
      );
      test.ok(
        dbReturns.update.calledWith({
          document: patchedDocument,
          updated_at: sinon.match.string
        }),
        'updates the relevant fields'
      );
      test.ok(db.calledWith('states'), 'updates the states table');
      test.ok(dbReturns.where('id', 'state id', `just for the APD's state`));
      test.ok(
        dbReturns.update.calledWith({ medicaid_office: 'new state profile' })
      );
      test.ok(
        res.send.calledWith({
          ...patchedDocument,
          id: 'apd id',
          state: 'state id',
          status: 'status',
          updated: sinon.match.string
        })
      );
    }
  );
});
