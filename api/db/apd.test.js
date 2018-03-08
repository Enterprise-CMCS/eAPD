const tap = require('tap');
const sinon = require('sinon');

const apd = require('./apd')();

tap.test('apd data model', async apdModelTests => {
  apdModelTests.test('setup', async setupTests => {
    setupTests.match(
      apd,
      { apd: { tableName: 'apds' } },
      'get the expected model definitions'
    );

    setupTests.type(
      apd.apd.state,
      'function',
      'creates a state relationship for the apd model'
    );
  });

  apdModelTests.test(
    'apd model sets up state relationship',
    async stateTests => {
      const self = {
        hasOne: sinon.stub().returns('beep')
      };

      const output = apd.apd.state.bind(self)();

      stateTests.ok(
        self.hasOne.calledWith('state', 'id', 'state_id'),
        'sets up the relationship mapping to a state'
      );
      stateTests.equal(output, 'beep', 'returns the expected value');
    }
  );
});
