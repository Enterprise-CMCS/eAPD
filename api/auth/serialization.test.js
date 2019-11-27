const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', async serializationTest => {
  const getUserByID = sandbox.stub();

  const doneCallback = sandbox.stub().returns('hi');

  const sessionStore = {
    addSession: sandbox.stub(),
    getUserID: sandbox.stub()
  };

  serializationTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    done();
  });

  serializationTest.test('serialize a user', async serializeTest => {
    const user = { id: 'the-user-id' };
    sessionStore.addSession.resolves('session-id');

    await serialization.serializeUser(user, doneCallback, { sessionStore });

    serializeTest.ok(
      doneCallback.calledWith(null, 'session-id'),
      'serializes the user object'
    );
  });

  serializationTest.test('deserialize a user', async deserializeTest => {
    const sessionID = 'the-session-id';

    deserializeTest.beforeEach(async () => {
      sessionStore.getUserID.resolves('the-user-id');
    });

    deserializeTest.test(
      'when the session ID does not map to a user',
      async invalidTest => {
        sessionStore.getUserID.resolves(null);

        await serialization.deserializeUser(sessionID, doneCallback, {
          getUserByID,
          sessionStore
        });

        invalidTest.ok(
          doneCallback.calledWith(null, null),
          'deserializes to a null user'
        );
      }
    );

    deserializeTest.test(
      'when there is a database problem',
      async invalidTest => {
        getUserByID.rejects();

        await serialization.deserializeUser(sessionID, doneCallback, {
          getUserByID,
          sessionStore
        });
        invalidTest.ok(
          doneCallback.calledWith(sinon.match.string),
          'calls back with an error'
        );
      }
    );

    deserializeTest.test('that is not in the database', async invalidTest => {
      getUserByID.resolves(null);

      await serialization.deserializeUser(sessionID, doneCallback, {
        getUserByID,
        sessionStore
      });
      invalidTest.ok(
        doneCallback.calledWith(null, null),
        'deserializes to a null user'
      );
    });

    deserializeTest.test('that is in the database', async validTest => {
      validTest.test('with no role', async noRoleTest => {
        getUserByID.resolves('this is a user');

        await serialization.deserializeUser(sessionID, doneCallback, {
          getUserByID,
          sessionStore
        });

        noRoleTest.ok(
          doneCallback.calledWith(null, 'this is a user'),
          'deserializes the user ID to an object'
        );
      });
    });
  });
});
