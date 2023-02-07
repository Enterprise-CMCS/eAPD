import tap from 'tap';
import { createSandbox, match } from 'sinon';
import { can, userCanEditAPD } from '../../middleware/index.js';
import patchEndpoint from './patch.js';

tap.test('apds PATCH endpoint', async tests => {
  const sandbox = createSandbox();
  let handler;

  const app = {
    patch: sandbox.spy()
  };

  const updateAPDDocument = sandbox.stub();
  const adminCheckAPDDocument = sandbox.stub();

  const res = {
    end: sandbox.spy(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  const next = sandbox.stub();

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.send.returns(res);
    res.status.returns(res);

    patchEndpoint(app, {
      updateAPDDocument,
      adminCheckAPDDocument
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
        match.func
      ),
      'creates a PATCH endpoint at the right location with the right permissions'
    );
  });

  tests.test('handles the case where an APD ID is not provided', async test => {
    await handler({ params: {} }, res, next);

    test.ok(res.status.calledWith(400), 'sends an HTTP 404 status');
  });

  tests.test(
    'handles the case where the message body is not an array',
    async test => {
      await handler(
        { params: { id: 'apd id' }, user: { state: { id: 'co' } } },
        res,
        next
      );

      test.ok(res.status.calledWith(400), 'sends an HTTP 400 status');
      test.ok(res.end.calledAfter(res.status), 'response is terminated');
    }
  );

  tests.test('fails gracefully on arbitrary database error', async test => {
    const error = new Error('fake error');
    updateAPDDocument.throws(error);
    await handler(
      { body: [], params: { id: 'apd id' }, user: { state: { id: 'co' } } },
      res,
      next
    );

    test.ok(next.calledWith(error), 'calls next with the error');
  });

  tests.test('fails if there are validation errors', async test => {
    const errors = {
      field1: {
        value: '2022-15-31',
        path: 'field1',
        name: 'CastError',
        message:
          'Cast to date failed for value "2022-15-31" (type string) at path "field1"'
      }
    };

    updateAPDDocument.resolves({ errors, apd: {} });
    adminCheckAPDDocument.resolves([]);

    const patches = [{ value: 'patch 1' }, { value: 'patch 2' }];

    await handler(
      {
        body: patches,
        params: { id: 'apd id' },
        user: { state: { id: 'co' } }
      },
      res,
      next
    );

    test.ok(
      res.send.calledWith({
        errors,
        apd: {
          id: 'apd id',
          created: undefined,
          state: undefined,
          updated: undefined
        },
        adminCheck: [],
        budget: {}
      }),
      'sends back the list of invalid paths'
    );
  });

  tests.test('saves the updated document if everything is good', async test => {
    const apd = {
      id: 'apd id',
      status: 'draft'
    };
    updateAPDDocument.resolves({
      errors: {},
      apd: {
        ...apd,
        createdAt: 'created at',
        updatedAt: 'updated at',
        stateId: 'co',
        keyPersonnel: [
          {
            name: 'Sam I Am',
            email: 'sam@greeneggs.com'
          }
        ],
        budget: {}
      }
    });
    adminCheckAPDDocument.resolves([]);

    const patch = [
      { op: 'replace', path: '/keyPersonnel/0/name', value: 'Sam I Am' },
      {
        op: 'replace',
        path: '/keyPersonnel/0/email',
        value: 'sam@greeneggs.com'
      }
    ];

    await handler(
      {
        body: patch,
        params: { id: 'apd id' },
        user: { state: { id: 'co' } }
      },
      res,
      next
    );

    test.ok(
      updateAPDDocument.calledWith({ id: 'apd id', stateId: 'co', patch }),
      'updates the right set of things'
    );

    test.ok(
      res.send.calledWith({
        errors: {},
        apd: {
          ...apd,
          id: 'apd id',
          created: 'created at',
          updated: 'updated at',
          state: 'co',
          status: 'draft',
          keyPersonnel: [
            {
              name: 'Sam I Am',
              email: 'sam@greeneggs.com'
            }
          ]
        },
        adminCheck: [],
        budget: {}
      })
    );
  });
});
