const tap = require('tap');
const sinon = require('sinon');

const {
  can,
  userCanEditAPD,
  synchronizeSpecific
} = require('../../middleware');
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
      const model = {};
      const modelClass = {};
      const out = putEndpoint.syncResponder(modelClass)({
        meta: {
          apd: model
        }
      });

      test.same(
        out,
        { model, modelClass, action: 'update-apd' },
        'returns the specific model to synchronize'
      );
    }
  );

  endpointTest.test(
    'afterSync event handler updates state profile',
    async test => {
      const StateModel = {
        where: sinon.stub(),
        fetch: sinon.stub()
      };
      StateModel.where.returns(StateModel);

      const state = {
        set: sinon.stub(),
        save: sinon.stub().resolves()
      };
      StateModel.fetch.resolves(state);

      await putEndpoint.updateStateProfile(StateModel)({
        user: { state: 'zz' },
        body: { stateProfile: { info: 'goes here', toBe: 'saved' } }
      });

      test.ok(
        StateModel.where.calledWith({ id: 'zz' }),
        'fetches the associated state'
      );
      test.ok(
        state.set.calledWith('medicaid_office', {
          info: 'goes here',
          toBe: 'saved'
        }),
        'updates the state with profile info from the request body'
      );
    }
  );
});
