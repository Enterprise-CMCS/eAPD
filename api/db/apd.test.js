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
      apd.apd.activities,
      'function',
      'creates an activities relationship for the apd model'
    );

    setupTests.type(
      apd.apd.state,
      'function',
      'creates a state relationship for the apd model'
    );
  });

  apdModelTests.test(
    'apd model sets up activities relationship',
    async activitiesTests => {
      const self = {
        hasMany: sinon.stub().returns('florp')
      };

      const output = apd.apd.activities.bind(self)();

      activitiesTests.ok(
        self.hasMany.calledWith('apdActivity'),
        'sets up the relationship mapping to activities'
      );
      activitiesTests.equal(output, 'florp', 'returns the expected value');
    }
  );

  apdModelTests.test(
    'apd model sets up state relationship',
    async stateTests => {
      const self = {
        belongsTo: sinon.stub().returns('beep')
      };

      const output = apd.apd.state.bind(self)();

      stateTests.ok(
        self.belongsTo.calledWith('state'),
        'sets up the relationship mapping to a state'
      );
      stateTests.equal(output, 'beep', 'returns the expected value');
    }
  );
});
