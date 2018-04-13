const tap = require('tap');
const sinon = require('sinon');

const {
  loggedIn,
  loadActivity,
  synchronizeSpecific,
  userCanEditAPD
} = require('../../../middleware');
const putEndpoint = require('./put');

tap.test('apd activity PUT endpoint', async endpointTest => {
  const app = { put: sinon.stub() };

  const ActivityModel = {};
  putEndpoint(app, ActivityModel);

  endpointTest.ok(
    app.put.calledWith(
      '/activities/:id',
      loggedIn,
      loadActivity(),
      userCanEditAPD(ActivityModel),
      synchronizeSpecific(putEndpoint.syncResponder)
    ),
    'apd activity PUT endpoint is registered'
  );

  endpointTest.test(
    'synchronize responder returns the expected data',
    async test => {
      const activity = {};
      const out = putEndpoint.syncResponder({
        meta: {
          activity
        }
      });

      test.same(out, activity, 'returns the specific model to synchronize');
    }
  );
});
