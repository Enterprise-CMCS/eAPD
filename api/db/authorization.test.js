const tap = require('tap');
const sinon = require('sinon');

const authorization = require('./authorization');

tap.test('authorization data model', async authModelTests => {
  const bookshelf = {
    Model: {
      extend: sinon.stub()
    }
  };

  authModelTests.test('setup', async setupTests => {
    bookshelf.Model.extend.returns('seven');

    const model = authorization(bookshelf);

    setupTests.ok(bookshelf.Model.extend.calledWith({
      tableName: 'auth_activities',
      roles: sinon.match.func
    }), 'activities model is configured correctly');

    setupTests.ok(bookshelf.Model.extend.calledWith({
      tableName: 'auth_roles',
      activities: sinon.match.func
    }), 'roles model is configured correctly');

    setupTests.same(model, { activities: 'seven', roles: 'seven' }, 'gives back extended bookshelf models');
  });

  authModelTests.test('activities model sets up roles relationship', async roleTests => {
    const extension = bookshelf.Model.extend.args.filter(args => args[0].tableName === 'auth_activities')[0][0];
    const self = {
      belongsToMany: sinon.stub().returns('poptart')
    };
    const roles = extension.roles.bind(self);

    const output = roles();

    roleTests.ok(self.belongsToMany.calledWith('seven', 'auth_role_activity_mapping', 'activity_id', 'role_id'), 'sets up the relationship mapping to roles');
    roleTests.equal(output, 'poptart', 'returns the expected value');
  });

  authModelTests.test('roles model sets up activities relationship', async activityTests => {
    const extension = bookshelf.Model.extend.args.filter(args => args[0].tableName === 'auth_roles')[0][0];
    const self = {
      belongsToMany: sinon.stub().returns('frootloop')
    };
    const roles = extension.activities.bind(self);

    const output = roles();

    activityTests.ok(self.belongsToMany.calledWith('seven', 'auth_role_activity_mapping', 'role_id', 'activity_id'), 'sets up the relationship mapping to activities');
    activityTests.equal(output, 'frootloop', 'returns the expected value');
  });

  authModelTests.test('subsequent calls to setup return cached values', async cacheTests => {
    bookshelf.Model.extend.reset();

    const model = authorization(bookshelf);

    cacheTests.ok(bookshelf.Model.extend.notCalled);
    cacheTests.same(model, { activities: 'seven', roles: 'seven' }, 'gives back extended bookshelf models');
  });
});
