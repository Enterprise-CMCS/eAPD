const tap = require('tap');
const sinon = require('sinon');

const activity = require('./activity')();

tap.test('activity data model', async activityModelTests => {
  activityModelTests.test('setup', async setupTests => {
    setupTests.match(
      activity,
      { activity: { tableName: 'activities' } },
      'get the expected model definitions'
    );

    setupTests.type(
      activity.activity.apd,
      'function',
      'creates a apd relationship for the activity model'
    );
  });

  activityModelTests.test(
    'activity model sets up apd relationship',
    async apdTests => {
      const self = {
        hasOne: sinon.stub().returns('baz')
      };

      const output = activity.activity.apd.bind(self)();

      apdTests.ok(
        self.hasOne.calledWith('apd', 'id', 'apd_id'),
        'sets up the relationship mapping to a apd'
      );
      apdTests.equal(output, 'baz', 'returns the expected value');
    }
  );
});
