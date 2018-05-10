const tap = require('tap');
const sinon = require('sinon');

const { can, userCanEditAPD } = require('../../middleware');
const putEndpoint = require('./put');

tap.test('apds PUT endpoint', async endpointTest => {
  const app = { put: sinon.stub() };

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app);

    setupTest.ok(
      app.put.calledWith(
        '/apds/:id',
        can('edit-document'),
        userCanEditAPD(),
        sinon.match.func
      ),
      'apds PUT endpoint is registered'
    );
  });

  endpointTest.test(
    'synchronize responder returns the expected data',
    async test => {
      const apd = {};
      const out = putEndpoint.syncResponder({
        meta: {
          apd
        }
      });

      test.same(
        out,
        { model: apd, action: 'update-apd' },
        'returns the specific model to synchronize'
      );
    }
  );
});
