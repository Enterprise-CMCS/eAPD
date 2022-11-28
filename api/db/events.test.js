import sinon from 'sinon';
import tap from 'tap';
import dbMock from './dbMock.test';
import createEventForAPD from './events';

let clock;

tap.test('database wrappers / events', async eventsTests => {
  const db = dbMock('apd_events');

  const sandbox = sinon.createSandbox();

  eventsTests.beforeEach(async () => {
    dbMock.reset();
    sandbox.resetHistory();

    // Fake out the clock so we know what time values to expect in queries.
    // Date.now() will return 0.
    clock = sinon.useFakeTimers(new Date(Date.UTC(2020, 10, 1, 0, 0)));
  });

  eventsTests.test('creates a new event for an APD', async test => {
    db.insert.resolves();

    const eventID = await createEventForAPD(
      { userID: 'user id', apdID: '42', eventType: 'export apd' },
      { db }
    );

    test.ok(
      db.insert.calledWith({
        event_id: sinon.match(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
        ),
        user_id: 'user id',
        apd_id: '42',
        event_type: 'export apd',
        event_at: '2020-11-01T00:00:00.000Z',
        metadata: null
      }),
      'attempts to insert the right values'
    );
    test.equal(
      eventID,
      db.insert.args[0][0].event_id,
      'returns the event ID that was saved to the database'
    );
  });

  eventsTests.test(
    'creates a new event for an APD with metadata',
    async test => {
      db.insert.resolves();

      const eventID = await createEventForAPD(
        {
          userID: 'user id',
          apdID: '42',
          eventType: 'export apd',
          metadata: { message: 'some metadata' }
        },
        { db }
      );

      test.ok(
        db.insert.calledWith({
          event_id: sinon.match(
            /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
          ),
          user_id: 'user id',
          apd_id: '42',
          event_type: 'export apd',
          event_at: '2020-11-01T00:00:00.000Z',
          metadata: { message: 'some metadata' }
        }),
        'attempts to insert the right values'
      );
      test.equal(
        eventID,
        db.insert.args[0][0].event_id,
        'returns the event ID that was saved to the database'
      );
    }
  );

  eventsTests.afterEach(async () => {
    clock.restore();
  });
});
