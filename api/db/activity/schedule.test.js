const tap = require('tap');
const sinon = require('sinon');
const moment = require('moment');

const schedule = require('./schedule').apdActivitySchedule;

tap.test('schedule data model', async scheduleModelTests => {
  scheduleModelTests.test('setup', async setupTests => {
    setupTests.match(
      schedule,
      {
        tableName: 'activity_schedule',
        static: {
          updateableFields: ['endDate', 'milestone', 'status']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      schedule.activity,
      'function',
      'creates an activity relationship'
    );
  });

  scheduleModelTests.test(
    'schedule model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = schedule.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  scheduleModelTests.test('converts attributes from snake case', async test => {
    const attributes = {
      id: 1,
      activity_id: 2,
      endDate: '2000-01-01',
      milestone: 5,
      status: 8
    };

    const output = schedule.format(attributes);

    test.match(output, {
      id: 1,
      activity_id: 2,
      end_date: '2000-01-01',
      milestone: 5,
      status: 8
    });
  });

  scheduleModelTests.test('validation', async test => {
    await Promise.all(
      [7, 'bob', 'January 3, 1947', '14 October 1066', '2014-3-9'].map(
        async invalidValue => {
          try {
            const self = { attributes: { endDate: invalidValue } };
            await schedule.validate.bind(self)();
            test.fail(`rejects if endDate is "${invalidValue}"`);
          } catch (e) {
            test.pass(`rejects if endDate is "${invalidValue}"`);
          }
        }
      )
    );

    const self = { attributes: { endDate: '2000-01-01' } };

    try {
      await schedule.validate.bind(self)();
      test.pass('resolves if all values are valid');
    } catch (e) {
      test.fail('resolves if all values are valid');
    }
  });

  scheduleModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('passport');
    self.get.withArgs('end_date').returns(moment('2001-01-01').toDate());
    self.get.withArgs('milestone').returns('a really big rock');
    self.get.withArgs('status').returns('test is passing, hopefully');

    const output = schedule.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'passport',
      endDate: '2001-01-01',
      milestone: 'a really big rock',
      status: 'test is passing, hopefully'
    });
  });
});
