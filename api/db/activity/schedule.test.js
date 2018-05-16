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
          updateableFields: [
            'actualEnd',
            'actualStart',
            'milestone',
            'plannedEnd',
            'plannedStart',
            'status'
          ]
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
      actualEnd: '2000-01-01',
      actualStart: '2000-01-02',
      milestone: 5,
      plannedEnd: '2000-01-03',
      plannedStart: '2000-01-04',
      status: 8
    };

    const output = schedule.format(attributes);

    test.match(output, {
      id: 1,
      activity_id: 2,
      actual_end: '2000-01-01',
      actual_start: '2000-01-02',
      milestone: 5,
      planned_end: '2000-01-03',
      planned_start: '2000-01-04',
      status: 8
    });
  });

  scheduleModelTests.test('validation', async test => {
    await Promise.all(
      ['actualEnd', 'actualStart', 'plannedEnd', 'plannedStart'].map(
        async attr => {
          await Promise.all(
            [7, 'bob', 'January 3, 1947', '14 October 1066', '2014-3-9'].map(
              async invalidValue => {
                try {
                  const self = { attributes: { [attr]: invalidValue } };
                  await schedule.validate.bind(self)();
                  test.fail(`rejects if ${attr} is "${invalidValue}"`);
                } catch (e) {
                  test.pass(`rejects if ${attr} is "${invalidValue}"`);
                }
              }
            )
          );
        }
      )
    );

    const self = {
      attributes: {
        actualEnd: '2000-01-01',
        actualStart: '2000-01-01',
        plannedEnd: '2000-01-01',
        plannedStart: '2000-01-01'
      }
    };

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
    self.get.withArgs('actual_end').returns(moment('2001-01-01').toDate());
    self.get.withArgs('actual_start').returns(moment('2002-02-02').toDate());
    self.get.withArgs('milestone').returns('a really big rock');
    self.get.withArgs('planned_end').returns(moment('2003-03-03').toDate());
    self.get.withArgs('planned_start').returns(moment('2004-04-04').toDate());
    self.get.withArgs('status').returns('test is passing, hopefully');

    const output = schedule.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'passport',
      actualEnd: '2001-01-01',
      actualStart: '2002-02-02',
      milestone: 'a really big rock',
      plannedEnd: '2003-03-03',
      plannedStart: '2004-04-04',
      status: 'test is passing, hopefully'
    });
  });
});
