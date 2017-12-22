const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', serializationTest => {
  const db = sandbox.stub();
  const where = sandbox.stub();
  const select = sandbox.stub();
  const doneCallback = sandbox.stub().returns('hi');

  serializationTest.beforeEach(done => {
    sandbox.reset();
    done();
  });

  serializationTest.test('serialize a user', serializeTest => {
    const user = { id: 'the-user-id' };
    serialization.serializeUser(user, doneCallback);
    serializeTest.ok(
      doneCallback.calledWith(null, 'the-user-id'),
      'serializes the user object'
    );
    serializeTest.done();
  });

  serializationTest.test('deserialize a user', deserializeTest => {
    const userID = 'the-user-id';

    deserializeTest.test('that is not in the database', invalidTest => {
      db.returns({ where, select });
      where.returns({ where, select });
      select.resolves([]);

      serialization.deserializeUser(userID, doneCallback, db).then(() => {
        invalidTest.ok(
          doneCallback.calledWith(sinon.match.string),
          'calls back with an error'
        );
        invalidTest.done();
      });
    });

    deserializeTest.test('that is in the database', validTest => {
      db.returns({ where, select });
      where.returns({ where, select });
      select.resolves([{ email: 'test-email', id: 'test-id' }]);

      serialization.deserializeUser(userID, doneCallback, db).then(() => {
        validTest.ok(
          doneCallback.calledWith(null, {
            username: 'test-email',
            id: 'test-id'
          }),
          'deserializes the user ID to an object'
        );
        validTest.done();
      });
    });

    deserializeTest.done();
  });

  serializationTest.done();
});
