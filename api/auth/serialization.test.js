const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', serializationTest => {
  const db = sandbox.stub();
  const where = sandbox.stub();
  const select = sandbox.stub();
  const fullOuterJoin = sandbox.stub();
  const innerJoin = sandbox.stub();
  const doneCallback = sandbox.stub().returns('hi');

  const dbChainable = {
    where,
    select,
    fullOuterJoin,
    innerJoin
  };

  serializationTest.beforeEach(done => {
    sandbox.reset();

    db.returns(dbChainable);
    where.returns(dbChainable);
    fullOuterJoin.returns(dbChainable);
    innerJoin.returns(dbChainable);

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
      validTest.test('with no role', noRoleTest => {
        select.resolves([{ email: 'test-email', id: 'test-id', role: null }]);

        serialization.deserializeUser(userID, doneCallback, db).then(() => {
          noRoleTest.ok(
            doneCallback.calledWith(null, {
              username: 'test-email',
              id: 'test-id',
              activities: sinon.match.array.deepEquals([])
            }),
            'deserializes the user ID to an object'
          );
          noRoleTest.done();
        });
      });

      validTest.test('with a role', adminRoleTest => {
        select
          .onFirstCall()
          .resolves([
            { email: 'test-email', id: 'test-id', auth_role: 'some-role' }
          ]);

        select
          .onSecondCall()
          .resolves([{ name: 'activity 1' }, { name: 'activity 2' }]);

        serialization.deserializeUser(userID, doneCallback, db).then(() => {
          adminRoleTest.ok(
            doneCallback.calledWith(null, {
              username: 'test-email',
              id: 'test-id',
              activities: sinon.match.array.deepEquals([
                'activity 1',
                'activity 2'
              ])
            }),
            'deserializes the user ID to an object'
          );
          adminRoleTest.done();
        });
      });

      validTest.done();
    });

    deserializeTest.done();
  });

  serializationTest.done();
});
