const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const serialization = require('./serialization');

tap.test('passport serialization', async (serializationTest) => {
  const userModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };
  const get = sandbox.stub();
  const activities = sandbox.stub();
  const doneCallback = sandbox.stub().returns('hi');

  serializationTest.beforeEach((done) => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    userModel.where.returns({ where: userModel.where, fetch: userModel.fetch });
    done();
  });

  serializationTest.test('serialize a user', async (serializeTest) => {
    const user = { id: 'the-user-id' };
    serialization.serializeUser(user, doneCallback);
    serializeTest.ok(
      doneCallback.calledWith(null, 'the-user-id'),
      'serializes the user object'
    );
  });

  serializationTest.test('deserialize a user', async (deserializeTest) => {
    const userID = 'the-user-id';

    deserializeTest.test(
      'when there is a database problem',
      async (invalidTest) => {
        userModel.fetch.rejects();

        await serialization.deserializeUser(userID, doneCallback, userModel);
        invalidTest.ok(
          doneCallback.calledWith(sinon.match.string),
          'calls back with an error'
        );
      }
    );

    deserializeTest.test('that is not in the database', async (invalidTest) => {
      userModel.fetch.resolves(null);

      await serialization.deserializeUser(userID, doneCallback, userModel);
      invalidTest.ok(
        doneCallback.calledWith(null, null),
        'deserializes to a null user'
      );
    });

    deserializeTest.test('that is in the database', async (validTest) => {
      validTest.test('with no role', async (noRoleTest) => {
        get.withArgs('email').returns('test-email');
        get.withArgs('id').returns('test-id');
        activities.resolves([]);
        userModel.fetch.resolves({ get, activities });

        await serialization.deserializeUser(userID, doneCallback, userModel);

        noRoleTest.ok(
          doneCallback.calledWith(null, {
            username: 'test-email',
            id: 'test-id',
            role: undefined,
            activities: sinon.match.array.deepEquals([])
          }),
          'deserializes the user ID to an object'
        );
      });

      validTest.test('with a role', async (adminRoleTest) => {
        get.withArgs('email').returns('test-email');
        get.withArgs('id').returns('test-id');
        get.withArgs('auth_role').returns('test-role');
        activities.resolves(['activity 1', 'activity 2']);
        userModel.fetch.resolves({ get, activities });

        await serialization.deserializeUser(userID, doneCallback, userModel);

        adminRoleTest.ok(
          doneCallback.calledWith(null, {
            username: 'test-email',
            id: 'test-id',
            role: 'test-role',
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
