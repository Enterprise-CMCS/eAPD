const tap = require('tap');
const sinon = require('sinon');

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

  scheduleModelTests.test(
    'converts attributes to/from snake case',
    async casingTests => {
      casingTests.test('format method converts to snake case', async test => {
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
          actual_end: new Date('2000-01-01T00:00:00.000Z'),
          actual_start: new Date('2000-01-02T00:00:00.000Z'),
          milestone: 5,
          planned_end: new Date('2000-01-03T00:00:00.000Z'),
          planned_start: new Date('2000-01-04T00:00:00.000Z'),
          status: 8
        });
      });

      casingTests.test('parse method converts from snake case', async test => {
        const attributes = {
          id: 1,
          activity_id: 2,
          actual_end: 3,
          actual_start: 4,
          milestone: 5,
          planned_end: 6,
          planned_start: 7,
          status: 8
        };

        const output = schedule.parse(attributes);

        test.match(output, {
          id: 1,
          activity_id: 2,
          actualEnd: 3,
          actualStart: 4,
          milestone: 5,
          plannedEnd: 6,
          plannedStart: 7,
          status: 8
        });
      });
    }
  );

  scheduleModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('passport');
    self.get.withArgs('actualEnd').returns('in the past');
    self.get.withArgs('actualStart').returns('hopefully in the past');
    self.get.withArgs('milestone').returns('a really big rock');
    self.get.withArgs('plannedEnd').returns('in the future maybe');
    self.get.withArgs('plannedStart').returns('a date probably');
    self.get.withArgs('status').returns('test is passing, hopefully');

    const output = schedule.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'passport',
      actualEnd: 'in the past',
      actualStart: 'hopefully in the past',
      milestone: 'a really big rock',
      plannedEnd: 'in the future maybe',
      plannedStart: 'a date probably',
      status: 'test is passing, hopefully'
    });
  });
});
