const tap = require('tap');
const sinon = require('sinon');

const {
  loggedIn,
  synchronizeAll,
  userCanEditAPD
} = require('../../../middleware');
const postEndpoint = require('./post');

tap.test('apd activity POST endpoint', async endpointTest => {
  const app = { post: sinon.stub() };

  postEndpoint(app);

  endpointTest.ok(
    app.post.calledWith(
      '/apds/:id/activities',
      loggedIn,
      userCanEditAPD(),
      synchronizeAll(postEndpoint.syncResponder)
    ),
    'apd activity POST endpoint is registered'
  );

  endpointTest.test(
    'synchronize responder returns the expected data',
    async test => {
      const ActivityModel = {};
      const out = postEndpoint.syncResponder(
        {
          meta: {
            apd: {
              get: sinon
                .stub()
                .withArgs('id')
                .returns('apd-id')
            }
          }
        },
        ActivityModel
      );

      test.same(
        out,
        { foreignKey: { apd_id: 'apd-id' }, modelClass: ActivityModel },
        'sets the foreign key and model class'
      );
    }
  );
});
