const tap = require('tap');
const sinon = require('sinon');

const user = require('./user');

tap.test('user data model', async userModelTests => {
  userModelTests.test('setup', async setupTests => {
    setupTests.match(
      user,
      {
        user: {
          tableName: 'users'
        }
      },
      'get the expected model definitions'
    );
    setupTests.type(
      user.user.role,
      'function',
      'creates a role relationship for the user model'
    );
    setupTests.type(
      user.user.activities,
      'function',
      'creates an activities relationship for the user model'
    );
  });

  userModelTests.test(
    'user model sets up role relationship',
    async roleTests => {
      const self = {
        hasOne: sinon.stub().returns('poptart')
      };

      const output = user.user.role.bind(self)();

      roleTests.ok(
        self.hasOne.calledWith('role', 'name', 'auth_role'),
        'sets up the relationship mapping to a role'
      );
      roleTests.equal(output, 'poptart', 'returns the expected value');
    }
  );

  userModelTests.test('activities helper method', async activitesTests => {
    const sandbox = sinon.createSandbox();
    const self = {
      load: sandbox.stub(),
      related: sandbox.stub(),
      relations: { role: false }
    };
    const related = sandbox.stub();
    const pluck = sandbox.stub();
    const activities = user.user.activities.bind(self);

    activitesTests.beforeEach(done => {
      sandbox.reset();

      self.load.resolves();
      self.related.withArgs('role').returns({ related });
      self.relations.role = false;
      related.withArgs('activities').returns({ pluck });
      pluck.withArgs('name').returns(['one', 'two', 'three']);

      done();
    });

    activitesTests.test(
      'resolves a list of activites when the role relationship is already loaded',
      async alreadyLoadedTests => {
        self.relations.role = {};
        self.relations.role.activities = true;
        const list = await activities();

        alreadyLoadedTests.ok(
          self.load.notCalled,
          'the model load method is not called'
        );
        alreadyLoadedTests.same(
          list,
          ['one', 'two', 'three'],
          'returns the list of activities'
        );
      }
    );

    activitesTests.test(
      'resolves a list of activites when the role relationship is not already loaded',
      async notAlreadyLoadedTests => {
        self.relations.role = false;
        const list = await activities();

        notAlreadyLoadedTests.ok(
          self.load.calledOnce,
          'the model load method is called'
        );
        notAlreadyLoadedTests.same(
          list,
          ['one', 'two', 'three'],
          'returns the list of activities'
        );
      }
    );
  });
});
