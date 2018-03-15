const tap = require('tap');
const sinon = require('sinon');

const utils = require('./utils');

tap.test('apd route utils', async tests => {
  const sandbox = sinon.createSandbox();

  tests.test(
    'whether a user can edit a particular APD',
    async userCanEditTest => {
      const UserModel = {
        where: sandbox.stub(),
        fetch: sandbox.stub()
      };
      const user = {
        apds: sandbox.stub()
      };
      userCanEditTest.beforeEach(async () => {
        sandbox.resetBehavior();
        sandbox.resetHistory();

        UserModel.where.returns(UserModel);
        UserModel.fetch.resolves(user);
      });

      userCanEditTest.test(
        'returns false if the user does not belong to the state that owns the APD',
        async falseTest => {
          user.apds.resolves([5, 10, 15]);
          const result = await utils.userCanEditAPD(1, 2, UserModel);

          falseTest.ok(
            UserModel.where.calledWith({ id: 1 }),
            'queries for the user we wanted'
          );
          falseTest.notOk(result, 'returns a false result');
        }
      );

      userCanEditTest.test(
        'returns true if the user belongs to the state that owns the APD',
        async trueTest => {
          user.apds.resolves([2]);
          const result = await utils.userCanEditAPD(1, 2, UserModel);

          trueTest.ok(
            UserModel.where.calledWith({ id: 1 }),
            'queries for the user we wanted'
          );
          trueTest.ok(result, 'returns a true result');
        }
      );
    }
  );
});
