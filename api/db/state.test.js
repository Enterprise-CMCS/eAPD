const tap = require('tap');
const sinon = require('sinon');

const stateCreator = require('./state');

tap.test('state data model', async stateModelTests => {
  const sandbox = sinon.createSandbox();
  stateModelTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  const state = stateCreator();

  stateModelTests.test('setup', async setupTests => {
    setupTests.match(
      state,
      {
        state: {
          tableName: 'states'
        }
      },
      'get the expected model definitions'
    );
  });

  stateModelTests.test(
    'state model sets up apd relationship',
    async apdTests => {
      const self = {
        hasMany: sinon.stub().returns('beep')
      };

      const output = state.state.apds.bind(self)();

      apdTests.ok(
        self.hasMany.calledWith('apd'),
        'sets up the relationship mapping to apds'
      );
      apdTests.equal(output, 'beep', 'returns the expected value');
    }
  );

  stateModelTests.test('validation', async validationTests => {
    const model = {
      attributes: {},
      hasChanged: sandbox.stub()
    };

    const validate = state.state.validate;

    validationTests.beforeEach(async () => {
      model.attributes = {};
      model.hasChanged.returns(false);
    });

    validationTests.test('valid if nothing has changed', async validTest => {
      validTest.resolves(validate(model), 'resolves');
    });

    validationTests.test('if the office is changed...', async office => {
      office.beforeEach(async () => {
        model.hasChanged.withArgs('medicaid_office').returns(true);
      });

      office.test(
        "and the office doesn't have the proper keys (address, city, zip)",
        async invalidTest => {
          model.attributes.medicaid_office = { foo: 'bar' };

          invalidTest.rejects(
            () => validate(model),
            { message: 'invalid-office' },
            'rejects with a message'
          );
        }
      );

      office.test('and the office data shape is valid', async validTest => {
        model.attributes.medicaid_office = {
          address: 'foo',
          city: 'bar',
          zip: '12345'
        };
        validTest.resolves(validate(model), 'resolves');
      });
    });
  });
});
