const tap = require('tap');
const sinon = require('sinon');

const {
  can,
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
      can('edit-document'),
      loadActivity(),
      userCanEditAPD(ActivityModel),
      synchronizeSpecific(putEndpoint.syncResponders.base)
    ),
    'apd activity PUT endpoint is registered'
  );

  endpointTest.test(
    'activities synchronize responder returns the expected data',
    async test => {
      const activity = {};
      const out = putEndpoint.syncResponders.base({
        meta: {
          activity
        }
      });

      test.same(
        out,
        { model: activity, action: 'update-activity' },
        'gives the activity model and action'
      );
    }
  );

  const components = ['approaches', 'expenses', 'goals', 'schedule'];

  components.forEach(component => {
    endpointTest.ok(
      app.put.calledWith(
        `/activities/:id/${component}`,
        can('edit-document'),
        loadActivity(),
        userCanEditAPD(ActivityModel),
        synchronizeSpecific(putEndpoint.syncResponders[component])
      ),
      `apd activity ${component} PUT endpoint is registered`
    );

    endpointTest.test(
      `activity ${component} synchronize responder returns the expected data`,
      async test => {
        const activity = {};
        const body = {};
        const req = { body, meta: { activity } };
        const out = putEndpoint.syncResponders[component](req);

        test.same(
          req.body,
          { [component]: body },
          `wraps the body in ${component} property`
        );
        test.same(
          out,
          { model: activity, action: 'update-activity' },
          'gives the activity model and action'
        );
      }
    );
  });

  endpointTest.equal(
    app.put.callCount,
    components.length + 1,
    'the right number of endpoints are added'
  );
});
