const tap = require('tap');
const sinon = require('sinon');

const base = require('./base');

tap.test('base data model', async baseModelTests => {
  const sandbox = sinon.createSandbox();

  const orm = {
    Model: {
      extend: sandbox.stub(),
      prototype: {
        destroy: sandbox.stub(),
        save: sandbox.stub()
      }
    },
    transaction: sandbox.stub()
  };

  const Model = {
    destroy: sandbox.stub(),
    fetch: sandbox.stub(),
    fetchAll: sandbox.stub(),
    save: sandbox.stub(),
    where: sandbox.stub()
  };

  const models = {};

  baseModelTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    Model.where.returns(Model);
  });

  baseModelTests.test('setup', async test => {
    orm.Model.extend.returns('extended model');
    const baseModel = base(orm, models);

    test.ok(
      orm.Model.extend.calledOnce,
      'creates a new model extended from the root'
    );
    test.equal(baseModel, 'extended model', 'returns the new model');
  });

  baseModelTests.test('instance-specific additions', async instanceTests => {
    base(orm, models);
    const instanceExtension = orm.Model.extend.args[0][0];

    instanceTests.test(
      'provides a method to filter input down to updateable fields',
      async test => {
        const self = {
          static: {
            updateableFields: ['a', 'b']
          }
        };

        const picked = instanceExtension.pickUpdateable.bind(self)({
          a: 1,
          b: 2,
          c: 3
        });

        test.same(picked, { a: 1, b: 2 }, 'returns the picked object');
      }
    );

    instanceTests.test(
      `provides a method to get the model's own name`,
      async test => {
        const self = {
          constructor: {
            modelName: `I'm a mog; half man, half dog.  I'm my own best friend.`
          }
        };

        const modelName = instanceExtension.modelName.bind(self)();
        test.equal(
          modelName,
          `I'm a mog; half man, half dog.  I'm my own best friend.`,
          'returns the model name'
        );
      }
    );

    instanceTests.test(
      'overrides destroy method to also delete child models',
      async destroyTests => {
        destroyTests.test(
          `doesn't try to delete children if they're not defined`,
          async test => {
            const self = {
              modelName: sandbox.stub().returns('TestModel'),
              get: sandbox.stub().returns('model-id')
            };

            await instanceExtension.destroy.bind(self)('arg1', 'arg2');

            test.ok(
              orm.Model.prototype.destroy.calledWith('arg1', 'arg2'),
              'calls down to the base destroy method'
            );
          }
        );

        destroyTests.test('deletes children if defiend', async test => {
          const self = {
            modelName: sandbox.stub().returns('TestModel'),
            get: sandbox.stub().returns('model-id'),
            models: {
              'child-model': Model
            },
            static: {
              foreignKey: 'foreign-key',
              owns: {
                'property-name': 'child-model'
              }
            }
          };

          const destroy = sandbox
            .stub()
            .withArgs('args1', 'args2')
            .resolves();
          Model.fetchAll.resolves([{ destroy }]);

          await instanceExtension.destroy.bind(self)('arg1', 'arg2');

          test.ok(
            destroy.calledWith('arg1', 'arg2'),
            'child model is destroyed'
          );
          test.ok(
            orm.Model.prototype.destroy.calledWith('arg1', 'arg2'),
            'calls down to the base destroy method'
          );
        });
      }
    );

    instanceTests.test(
      'overrides save method to call validation if defined',
      async saveTests => {
        const self = {
          modelName: sandbox.stub().returns('TestModel'),
          validate: sandbox.stub()
        };

        saveTests.test('throws if validation fails', async test => {
          self.validate.rejects(new Error('validation failed'));

          try {
            await instanceExtension.save.bind(self)('arg1', 'arg2');
            test.fail('rejects');
          } catch (e) {
            test.pass('rejects');
            test.equal(
              e.message,
              'validation failed',
              'validation error message is sent back'
            );
            test.equal(e.statusCode, 400, 'error includes a status code');
            test.same(
              e.error,
              { error: 'validation failed' },
              'sets an error object'
            );
          }
        });

        saveTests.test('saves if validation succeeds', async test => {
          self.validate.resolves();
          await instanceExtension.save.bind(self)('arg1', 'arg2');

          test.ok(
            orm.Model.prototype.save.calledWith('arg1', 'arg2'),
            'calls down to the base save method'
          );
        });
      }
    );

    instanceTests.test('adds a synchronize method', async syncTests => {
      const self = {
        get: sandbox.stub(),
        modelName: sandbox.stub().returns('TestModel'),
        pickUpdateable: sandbox.stub(),
        save: sandbox.stub(),
        set: sandbox.spy(),
        static: {
          foreignKey: 'foreign-key'
        }
      };

      syncTests.beforeEach(async () => {
        self.modelName.returns('TestModel');
        self.pickUpdateable.returns('the-fields-to-update');
        self.get.withArgs('id').returns('model-id');
        self.save.resolves();
      });

      syncTests.test(
        'filters incoming data and creates a transaction',
        async test => {
          orm.transaction.resolves();

          await instanceExtension.synchronize.bind(self)({
            bad: 'should go away',
            good: 'should stay'
          });

          test.ok(
            self.pickUpdateable.calledWith({
              bad: 'should go away',
              good: 'should stay'
            }),
            'filters raw data'
          );
          test.ok(orm.transaction.calledOnce, 'starts a database transaction');
        }
      );

      syncTests.test(
        'does not attempt to save children if not defined',
        async test => {
          orm.transaction.resolves();

          await instanceExtension.synchronize.bind(self)('raw-data');

          const transaction = orm.transaction.args[0][0];
          const transacting = 'this is the transaction object';

          await transaction(transacting);

          test.ok(
            self.set.calledWith('the-fields-to-update'),
            'model is updated with filtered data, not raw data'
          );
          test.ok(
            self.save.calledWith(null, { transacting }),
            'this model is saved within the transaction'
          );
        }
      );

      syncTests.test('attempts to save children if defined', async test => {
        orm.transaction.resolves();
        self.static.owns = {
          child1: 'ChildModel1',
          child2: 'ChildModel2'
        };
        self.models = {
          ChildModel1: { synchronize: sandbox.stub().resolves() },
          ChildModel2: { synchronize: sandbox.stub().resolves() }
        };

        await instanceExtension.synchronize.bind(self)({
          child1: 'this-is-child-1-data'
        });

        const transaction = orm.transaction.args[0][0];
        const transacting = 'this is the transaction object';

        await transaction(transacting);

        test.ok(
          self.models.ChildModel1.synchronize.calledWith(
            'this-is-child-1-data'
          ),
          'child model represented in the data is synchronized'
        );
        test.ok(
          self.models.ChildModel2.synchronize.notCalled,
          'child model NOT represented in the data is NOT synchronized'
        );
        test.ok(
          self.set.calledWith('the-fields-to-update'),
          'model is updated with filtered data, not raw data'
        );
        test.ok(
          self.save.calledWith(null, { transacting }),
          'this model is saved within the transaction'
        );
      });
    });
  });
});
