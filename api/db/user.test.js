const tap = require('tap');
const sinon = require('sinon');

const user = require('./user');

tap.only('user data model', async userModelTests => {
  const bookshelf = {
    Model: {
      extend: sinon.stub()
    }
  };
  const roleModel = sinon.stub();

  userModelTests.test('setup', async setupTests => {
    bookshelf.Model.extend.returns('seven');

    const model = user(bookshelf, roleModel);

    setupTests.ok(bookshelf.Model.extend.calledWith({
      tableName: 'users',
      role: sinon.match.func,
      activities: sinon.match.func
    }), 'model is configured correctly');
    setupTests.equal(model, 'seven', 'gives back an extended bookshelf model');
  });

  userModelTests.test('setups up a role relationship', async roleTests => {
    roleModel.returns('role model setup');
    const self = {
      hasOne: sinon.spy()
    };

    const extension = bookshelf.Model.extend.args[0][0];
    const role = extension.role.bind(self);
    role();

    roleTests.ok(roleModel.calledOnce, 'a role model is instantiated');
    roleTests.ok(self.hasOne.calledWith('role model setup', 'name', 'auth_role'), 'sets up the data relationship');
  });

  userModelTests.test('activities helper method', async activitesTests => {
    let activities;

    const sandbox = sinon.createSandbox();
    const self = {
      load: sandbox.stub(),
      related: sandbox.stub(),
      relations: { role: false }
    };
    const related = sandbox.stub();
    const pluck = sandbox.stub();

    activitesTests.beforeEach(done => {
      const extension = bookshelf.Model.extend.args[0][0];
      activities = extension.activities.bind(self);

      sandbox.reset();

      self.load.resolves();
      self.related.withArgs('role').returns({ related });
      self.relations.role = false;
      related.withArgs('activities').returns({ pluck });
      pluck.withArgs('name').returns(['one', 'two', 'three']);

      done();
    });

    activitesTests.test('resolves a list of activites when the role relationship is already loaded', async alreadyLoadedTests => {
      self.relations.role = true;
      const list = await activities();

      alreadyLoadedTests.ok(self.load.notCalled, 'the model load method is not called');
      alreadyLoadedTests.same(list, ['one', 'two', 'three'], 'returns the list of activities');
    });

    activitesTests.test('resolves a list of activites when the role relationship is not already loaded', async notAlreadyLoadedTests => {
      self.relations.role = false;
      const list = await activities();

      notAlreadyLoadedTests.ok(self.load.calledOnce, 'the model load method is called');
      notAlreadyLoadedTests.same(list, ['one', 'two', 'three'], 'returns the list of activities');
    });
  });

  userModelTests.test('subsequent calls to setup return cached values', async cacheTests => {
    bookshelf.Model.extend.reset();

    const model = user(bookshelf);

    cacheTests.ok(bookshelf.Model.extend.notCalled);
    cacheTests.equal(model, 'seven', 'gives back an extended bookshelf model');
  });
});
