const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', async serializationTest => {
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

  serializationTest.test('serialize a user', async serializeTest => {
    const user = { id: 'the-user-id' };
    serialization.serializeUser(user, doneCallback);
    serializeTest.ok(
      doneCallback.calledWith(null, 'the-user-id'),
      'serializes the user object'
    );
  });

  serializationTest.test('deserialize a user', async deserializeTest => {
    const userID = 'the-user-id';

    deserializeTest.test('that is not in the database', async invalidTest => {
      select.resolves([]);

      await serialization.deserializeUser(userID, doneCallback, db);
      invalidTest.ok(
        doneCallback.calledWith(sinon.match.string),
        'calls back with an error'
      );
    });

    deserializeTest.test('that is in the database', async validTest => {
      validTest.test('with no role', async noRoleTest => {
        select.resolves([{ email: 'test-email', id: 'test-id', role: null }]);

        await serialization.deserializeUser(userID, doneCallback, db);

        noRoleTest.ok(
          doneCallback.calledWith(null, {
            username: 'test-email',
            id: 'test-id',
            activities: sinon.match.array.deepEquals([])
          }),
          'deserializes the user ID to an object'
        );
      });

      validTest.test('with a role', async adminRoleTest => {
        select
          .onFirstCall()
          .resolves([
            { email: 'test-email', id: 'test-id', auth_role: 'some-role' }
          ]);

        select
          .onSecondCall()
          .resolves([{ name: 'activity 1' }, { name: 'activity 2' }]);

        await serialization.deserializeUser(userID, doneCallback, db);

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
      });
    });
  });
});
