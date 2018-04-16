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
});
