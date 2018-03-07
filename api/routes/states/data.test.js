const tap = require('tap');
const sinon = require('sinon');

const dataHelper = require('./data');

tap.test('states data helper', async helperTest => {
  helperTest.test(
    'gives back a list of fields that can be sent back to the caller',
    async getFieldsTest => {
      getFieldsTest.same(
        dataHelper.getFields,
        [
          'id',
          'medicaid_office',
          'name',
          'program_benefits',
          'program_vision',
          'state_pocs'
        ],
        'gives the expected list of fields'
      );
    }
  );

  helperTest.test(
    'gives back a list of fields that the caller can edit',
    async putFieldsTest => {
      putFieldsTest.same(
        dataHelper.putFields,
        ['medicaid_office', 'program_benefits', 'program_vision', 'state_pocs'],
        'gives the expected list of fields'
      );
    }
  );

  helperTest.test(
    'gives back a state data model object',
    async getStateTests => {
      getStateTests.test('...when given a state ID', async stateIDTest => {
        const stateModel = {
          where: sinon.stub(),
          fetch: sinon.stub()
        };
        stateModel.where.returns(stateModel);
        stateModel.fetch.resolves('the state');

        const state = await dataHelper.getStateFromUserOrID(
          'STATE ID',
          null,
          stateModel,
          null
        );

        stateIDTest.ok(
          stateModel.where.calledWith({ id: 'state id' }),
          'queries the database for the expected ID'
        );
        stateIDTest.ok(stateModel.fetch.calledOnce, 'fetches');
        stateIDTest.equal(state, 'the state', 'returns the expected result');
      });

      getStateTests.test(
        '...when given a user ID and no state ID',
        async userIDTest => {
          const userModel = {
            where: sinon.stub(),
            fetch: sinon.stub()
          };
          userModel.where.returns(userModel);
          userModel.fetch.withArgs({ withRelated: ['state'] }).resolves({
            related: sinon
              .stub()
              .withArgs('state')
              .returns('the state')
          });

          const state = await dataHelper.getStateFromUserOrID(
            null,
            'userID',
            null,
            userModel
          );

          userIDTest.ok(
            userModel.where.calledWith({ id: 'userID' }),
            'queries the database for the expected ID'
          );
          userIDTest.ok(
            userModel.fetch.calledWith({ withRelated: ['state'] }),
            'fetches with the appropriate relations'
          );
          userIDTest.equal(state, 'the state', 'returns the expected result');
        }
      );
    }
  );
});
