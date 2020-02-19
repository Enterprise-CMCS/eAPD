const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

let clock;

// Drop in a mock for the knex raw object before we require the session store
// module, since it doesn't have dependency injection.
const db = sandbox.stub();

const dbQueryBuilder = {
  andWhere: sandbox.stub(),
  del: sandbox.stub(),
  first: sandbox.stub(),
  insert: sandbox.stub(),
  select: sandbox.stub(),
  update: sandbox.stub(),
  where: sandbox.stub()
};

// Use a weird number of minutes so we can be more confident that the query
// for expired sessions is correct. The sessionStore reads from the environment
// so we need to set this before we require it.
process.env.SESSION_LIFETIME_MINUTES = 37;
const sessionLifetimeMilliseconds = 2220000;

const sessionStore = require('./sessionStore');

tap.test('session store module', async tests => {
  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    // Fake out the clock so we know what time values to expect in queries.
    // Date.now() will return 0.
    clock = sinon.useFakeTimers();

    dbQueryBuilder.andWhere.returns(dbQueryBuilder);
    dbQueryBuilder.select.returns(dbQueryBuilder);
    dbQueryBuilder.where.returns(dbQueryBuilder);

    db.withArgs('auth_sessions').returns(dbQueryBuilder);
  });

  tests.afterEach(async () => {
    clock.restore();
  });

  const expiredSessionsAreDeleted = () => {
    return (
      dbQueryBuilder.where.calledWith('expiration', '<', 0) &&
      dbQueryBuilder.del.calledAfter(dbQueryBuilder.where)
    );
  };

  tests.test('add a user session', async addTests => {
    addTests.test('error saving to the database', async test => {
      dbQueryBuilder.insert.rejects(new Error());

      const sessionID = await sessionStore.addUserSession('user id', { db });

      test.ok(
        dbQueryBuilder.insert.calledWith({
          session_id: sinon.match(/[A-Za-z0-9+/]{64}/),
          user_id: 'user id',
          expiration: sessionLifetimeMilliseconds
        }),
        'attempts to insert the right values'
      );
      test.equal(sessionID, null, 'gives a null session ID');
    });

    addTests.test('session is saved to the database', async test => {
      dbQueryBuilder.insert.resolves();

      const sessionID = await sessionStore.addUserSession('user id', { db });

      test.ok(
        dbQueryBuilder.insert.calledWith({
          session_id: sinon.match(/[A-Za-z0-9+/]{64}/),
          user_id: 'user id',
          expiration: sessionLifetimeMilliseconds
        }),
        'attempts to insert the right values'
      );
      test.equal(
        sessionID,
        dbQueryBuilder.insert.args[0][0].session_id,
        'returns the session ID that was saved to the database'
      );
    });
  });

  tests.test('get user ID from session', async getTests => {
    const queryIsCorrect = () => {
      return (
        dbQueryBuilder.where.calledWith('session_id', 'session id') &&
        dbQueryBuilder.andWhere.calledAfter(dbQueryBuilder.where) &&
        dbQueryBuilder.andWhere.calledWith('expiration', '>', 0) &&
        dbQueryBuilder.select.calledAfter(dbQueryBuilder.andWhere) &&
        dbQueryBuilder.select.calledWith('user_id') &&
        dbQueryBuilder.first.calledAfter(dbQueryBuilder.select)
      );
    };

    getTests.test('error fetching from the database', async test => {
      dbQueryBuilder.first.rejects(new Error());

      const userID = await sessionStore.getUserIDFromSession('session id', {
        db
      });

      test.ok(expiredSessionsAreDeleted(), 'expired sessions are deleted');
      test.ok(queryIsCorrect(), 'queries for a matching, non-expired session');
      test.equal(userID, null, 'gives null user ID');
    });

    getTests.test('no user matching the session ID', async test => {
      dbQueryBuilder.first.resolves(null);

      const userID = await sessionStore.getUserIDFromSession('session id', {
        db
      });

      test.ok(expiredSessionsAreDeleted(), 'expired sessions are deleted');
      test.ok(queryIsCorrect(), 'queries for a matching, non-expired session');
      test.equal(userID, null, 'gives null user ID');
    });

    getTests.test('with a matching user', async test => {
      dbQueryBuilder.first.resolves({ user_id: 'user id' });

      // throw this in here to make sure that an error deleting expired
      // sessions doesn't mess us up
      dbQueryBuilder.del.rejects();

      const userID = await sessionStore.getUserIDFromSession('session id', {
        db
      });

      test.ok(expiredSessionsAreDeleted(), 'expired sessions are deleted');
      test.ok(queryIsCorrect(), 'queries for a matching, non-expired session');
      test.ok(
        dbQueryBuilder.update.calledWith({ expiration: 2220000 }),
        'session is extended'
      );
      test.equal(userID, 'user id', 'returns the user ID');
    });
  });

  tests.test('remove a user session', async removeTests => {
    removeTests.test('with a database error', async test => {
      dbQueryBuilder.del.rejects(new Error());

      await sessionStore.removeUserSession('session id', { db });

      test.ok(
        dbQueryBuilder.where.calledWith('session_id', 'session id'),
        'finds the matching session'
      );
      test.ok(
        dbQueryBuilder.del.calledAfter(dbQueryBuilder.where),
        'and deletes it'
      );
    });

    removeTests.test('with success', async test => {
      dbQueryBuilder.del.resolves();

      await sessionStore.removeUserSession('session id', { db });

      test.ok(
        dbQueryBuilder.where.calledWith('session_id', 'session id'),
        'finds the matching session'
      );
      test.ok(
        dbQueryBuilder.del.calledAfter(dbQueryBuilder.where),
        'and deletes it'
      );
    });
  });
});
