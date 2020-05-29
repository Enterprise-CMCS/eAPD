const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', async serializationTest => {
  const getUserByID = sandbox.stub();

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

    const sessionId = await serialization.serializeUser(user, { sessionStore });
    serializeTest.same(sessionId, 'session-id', 'serializes the user object');
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

        const user = await serialization.deserializeUser(sessionID, {
          getUserByID,
          sessionStore
        });

        invalidTest.same(user, null, 'deserializes to a null user');
      }
    );

    deserializeTest.test(
      'when there is a database problem',
      async invalidTest => {
        getUserByID.rejects();

        invalidTest.throws(
          serialization.deserializeUser(sessionID, {
            getUserByID,
            sessionStore
          }),
          {},
          'throws an error'
        );
      }
    );

    deserializeTest.test('that is not in the database', async invalidTest => {
      getUserByID.resolves(null);

      const user = await serialization.deserializeUser(sessionID, {
        getUserByID,
        sessionStore
      });
      invalidTest.same(user, null, 'deserializes to a null user');
    });

    deserializeTest.test('that is in the database', async validTest => {
      validTest.test('with no role', async noRoleTest => {
        getUserByID.resolves('this is a user');

        const user = await serialization.deserializeUser(sessionID, {
          getUserByID,
          sessionStore
        });

        noRoleTest.same(
          user,
          'this is a user',
          'deserializes the user ID to an object'
        );
      });
    });
  });
});
