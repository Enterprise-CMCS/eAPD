const tap = require('tap');
const sinon = require('sinon');

const authorization = require('./authorization')();

tap.test('authorization data models', async authModelTests => {
  authModelTests.test('setup', async setupTests => {
    setupTests.match(
      authorization,
      {
        activity: {
          tableName: 'auth_activities'
        },
        role: {
          tableName: 'auth_roles'
        }
      },
      'get the expected model definitions'
    );
    setupTests.type(
      authorization.activity.roles,
      'function',
      'creates a roles relationship for the activity model'
    );
    setupTests.type(
      authorization.role.activities,
      'function',
      'creates an activities relationship for the role model'
    );
    setupTests.type(
      authorization.role.validate,
      'function',
      'creates a validation method for the role model'
    );
  });

  authModelTests.test(
    'activity model sets up roles relationship',
    async roleTests => {
      const self = {
        belongsToMany: sinon.stub().returns('poptart')
      };

      const output = authorization.activity.roles.bind(self)();

      roleTests.ok(
        self.belongsToMany.calledWith(
          'role',
          'auth_role_activity_mapping',
          'activity_id',
          'role_id'
        ),
        'sets up the relationship mapping to roles'
      );
      roleTests.equal(output, 'poptart', 'returns the expected value');
    }
  );

  authModelTests.test('role model...', async roleModelTests => {
    roleModelTests.test(
      'role model sets up activities relationship',
      async activityTests => {
        const self = {
          belongsToMany: sinon.stub().returns('frootloop')
        };

        const output = authorization.role.activities.bind(self)();

        activityTests.ok(
          self.belongsToMany.calledWith(
            'activity',
            'auth_role_activity_mapping',
            'role_id',
            'activity_id'
          ),
          'sets up the relationship mapping to activities'
        );
        activityTests.equal(output, 'frootloop', 'returns the expected value');
      }
    );

    roleModelTests.test(
      'activities getter helper method',
      async getActivitesTests => {
        const sandbox = sinon.createSandbox();
        const self = {
          load: sandbox.stub(),
          related: sandbox.stub(),
          relations: { activities: false }
        };
        const pluck = sandbox.stub();
        const getActivities = authorization.role.getActivities.bind(self);

        getActivitesTests.beforeEach(done => {
          sandbox.resetBehavior();
          sandbox.resetHistory();

          self.load.resolves();
          self.related.withArgs('activities').returns({ pluck });
          pluck.withArgs('name').returns(['one', 'two', 'three']);

          done();
        });

        getActivitesTests.test(
          'resolves a list of activites when the role relationship is already loaded',
          async alreadyLoadedTests => {
            self.relations.activities = true;
            const list = await getActivities();

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

        getActivitesTests.test(
          'resolves a list of activites when the role relationship is not already loaded',
          async notAlreadyLoadedTests => {
            self.relations.activities = false;
            const list = await getActivities();

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
      }
    );

    roleModelTests.test('validation...', async validationTests => {
      const sandbox = sinon.createSandbox();
      const roleModel = {
        attributes: {},
        hasChanged: sandbox.stub(),
        where: sandbox.stub(),
        fetch: sandbox.stub()
      };

      validationTests.beforeEach(async () => {
        sandbox.resetBehavior();
        sandbox.resetHistory();

        roleModel.attributes = {};
        roleModel.where.returns({ fetch: roleModel.fetch });
      });

      validationTests.test(
        'fails if name is not a string',
        async invalidTest => {
          try {
            roleModel.hasChanged.withArgs('name').returns(true);
            roleModel.attributes.name = 7;

            await authorization.role.validate([], roleModel, {});
            invalidTest.fail('should throw');
            invalidTest.equal(
              '',
              'missing-name',
              'throws the expected message'
            );
          } catch (e) {
            invalidTest.pass('should throw');
            invalidTest.equal(
              e.message,
              'missing-name',
              'throws the expected message'
            );
          }
        }
      );

      validationTests.test('fails if name is empty', async invalidTest => {
        try {
          roleModel.hasChanged.withArgs('name').returns(true);
          roleModel.attributes.name = '';

          await authorization.role.validate([], roleModel, {});
          invalidTest.fail('should throw');
          invalidTest.equal('', 'missing-name', 'throws the expected message');
        } catch (e) {
          invalidTest.pass('should throw');
          invalidTest.equal(
            e.message,
            'missing-name',
            'throws the expected message'
          );
        }
      });

      validationTests.test(
        'fails if name already exists',
        async invalidTest => {
          try {
            roleModel.hasChanged.withArgs('name').returns(true);
            roleModel.attributes.name = 'hello';
            roleModel.fetch.resolves(true);

            await authorization.role.validate([], roleModel, {});
            invalidTest.fail('should throw');
            invalidTest.equal(
              '',
              'duplicate-name',
              'throws the expected message'
            );
          } catch (e) {
            invalidTest.pass('should throw');
            invalidTest.equal(
              e.message,
              'duplicate-name',
              'throws the expected message'
            );
          }
        }
      );

      validationTests.test(
        'fails if activities is not an array',
        async invalidTest => {
          try {
            roleModel.hasChanged.withArgs('name').returns(false);

            await authorization.role.validate('hello', roleModel, {});
            invalidTest.fail('should throw');
            invalidTest.equal(
              '',
              'invalid-activities',
              'throws the expected message'
            );
          } catch (e) {
            invalidTest.pass('should throw');
            invalidTest.equal(
              e.message,
              'invalid-activities',
              'throws the expected message'
            );
          }
        }
      );

      validationTests.test(
        'fails if activities are not numeric',
        async invalidTest => {
          try {
            roleModel.hasChanged.withArgs('name').returns(false);

            await authorization.role.validate([1, 'a', 3], roleModel, {});
            invalidTest.fail('should throw');
            invalidTest.equal(
              '',
              'invalid-activities',
              'throws the expected message'
            );
          } catch (e) {
            invalidTest.pass('should throw');
            invalidTest.equal(
              e.message,
              'invalid-activities',
              'throws the expected message'
            );
          }
        }
      );

      validationTests.test(
        'fails if activities do not match known activities',
        async invalidTest => {
          try {
            roleModel.hasChanged.withArgs('name').returns(false);

            const activityModel = {
              fetchAll: sinon.stub().resolves([
                {
                  get: sinon.stub().returns(1)
                },
                {
                  get: sinon.stub().returns(2)
                }
              ])
            };

            await authorization.role.validate(
              [1, 2, 3],
              roleModel,
              activityModel
            );
            invalidTest.fail('should throw');
            invalidTest.equal(
              '',
              'invalid-activities',
              'throws the expected message'
            );
          } catch (e) {
            invalidTest.pass('should throw');
            invalidTest.equal(
              e.message,
              'invalid-activities',
              'throws the expected message'
            );
          }
        }
      );

      validationTests.test('passes if everything is valid', async validTest => {
        try {
          roleModel.hasChanged.withArgs('name').returns(true);
          roleModel.attributes.name = 'hello';
          roleModel.fetch.resolves(false);

          const activityModel = {
            fetchAll: sinon.stub().resolves([
              {
                get: sinon.stub().returns(1)
              },
              {
                get: sinon.stub().returns(2)
              }
            ])
          };

          await authorization.role.validate([1, 2], roleModel, activityModel);
          validTest.pass('should not throw');
        } catch (e) {
          validTest.fail('should not throw');
        }
      });
    });
  });
});
