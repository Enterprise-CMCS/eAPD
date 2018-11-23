const tap = require('tap');
const sinon = require('sinon');

const {
  apdActivityStatePersonnel: personnel,
  apdActivityStatePersonnelCost: cost
} = require('./statePersonnel');

tap.test('state personnel data model', async statePersonnelModelTests => {
  statePersonnelModelTests.test('setup', async setupTests => {
    setupTests.match(
      personnel,
      {
        tableName: 'activity_state_peronnel',
        activity: Function,
        years: Function,
        static: {
          updateableFields: ['title', 'description'],
          owns: { years: 'apdActivityStatePersonnelCost' },
          foreignKey: 'personnel_id'
        }
      },
      'get the expected model definitions'
    );
  });

  statePersonnelModelTests.test(
    'expense model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = personnel.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  statePersonnelModelTests.test(
    'personnel model sets up yearly cost relationship',
    async relationTest => {
      const self = {
        hasMany: sinon.stub().returns('baz')
      };

      const output = personnel.years.bind(self)();

      relationTest.ok(
        self.hasMany.calledWith(
          'apdActivityStatePersonnelCost',
          'personnel_id'
        ),
        'sets up the relationship mapping to years'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  statePersonnelModelTests.test('snake-cases attributes', async test => {
    test.same(
      personnel.format({
        attr1: 'attribute 1',
        attrTwo: 'attribute 2'
      }),
      { attr1: 'attribute 1', attr_two: 'attribute 2' },
      'formats camel-case attributes into snake-case attributes'
    );
  });

  statePersonnelModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.returns('--- unknown field ---');
    self.get.withArgs('id').returns('id field');
    self.get.withArgs('title').returns('title field');
    self.get.withArgs('description').returns('description field');
    self.related.withArgs('years').returns('some times');

    const output = personnel.toJSON.bind(self)();

    jsonTests.same(output, {
      id: 'id field',
      title: 'title field',
      description: 'description field',
      years: 'some times'
    });
  });
});

tap.test(
  'state personnel cost data model',
  async statePersonnelCostModelTests => {
    statePersonnelCostModelTests.test('setup', async setupTests => {
      setupTests.match(
        cost,
        {
          tableName: 'activity_state_personnel_yearly',
          personnel: Function,
          static: {
            updateableFields: ['year', 'cost', 'fte']
          }
        },
        'get the expected model definitions'
      );
    });

    statePersonnelCostModelTests.test(
      'personnel cost model sets up personnel relationship',
      async relationTest => {
        const self = {
          belongsTo: sinon.stub().returns('baz')
        };

        const output = cost.personnel.bind(self)();

        relationTest.ok(
          self.belongsTo.calledWith('apdActivityStatePersonnel'),
          'sets up the relationship mapping to a state personnel'
        );
        relationTest.equal(output, 'baz', 'returns the expected value');
      }
    );

    statePersonnelCostModelTests.test('validation', async validationTests => {
      const self = { attributes: { fte: 0, year: 0 } };
      validationTests.test(
        'fails if the year is too early or too late',
        async test => {
          self.attributes.year = 2009;
          test.rejects(
            cost.validate.bind(self),
            'rejects if year is too early'
          );
          self.attributes.year = 3001;
          test.rejects(cost.validate.bind(self), 'rejects if year is too late');
        }
      );

      validationTests.test('fails if FTE is too small', async test => {
        self.attributes.year = 2019;
        self.attributes.fte = -0.3;
        test.rejects(cost.validate.bind(self), 'rejects if fte is negative');
      });

      validationTests.test('succeeds if data is valid', async test => {
        self.attributes.year = 2019;
        self.attributes.fte = 0.5;
        test.resolves(cost.validate.bind(self), 'resolves if year is valid');
      });
    });

    statePersonnelCostModelTests.test(
      'overrides toJSON method',
      async jsonTests => {
        const self = { get: sinon.stub() };
        self.get.returns('--- unknown field ---');
        self.get.withArgs('id').returns('id field');
        self.get.withArgs('cost').returns('cost field');
        self.get.withArgs('fte').returns('fte field');
        self.get.withArgs('year').returns('year field');

        const output = cost.toJSON.bind(self)();

        jsonTests.same(output, {
          id: 'id field',
          cost: 'cost field',
          fte: 'fte field',
          year: 'year field'
        });
      }
    );
  }
);
