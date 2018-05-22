const tap = require('tap');
const sinon = require('sinon');

const {
  apdKeyPersonnel: personnel,
  apdKeyPersonnelYear: year
} = require('./apdKeyPersonnel')();

tap.test('apd key personnel data model', async apdKeyPersonnelModelTests => {
  apdKeyPersonnelModelTests.test('setup', async test => {
    test.match(
      personnel,
      {
        tableName: 'apd_key_personnel',
        apd: Function,
        years: Function,
        static: {
          updateableFields: ['title', 'description'],
          owns: { years: 'apdKeyPersonnelYear' },
          foreignKey: 'apd_key_personnel_id'
        }
      },
      'get the expected model definitions'
    );
  });

  apdKeyPersonnelModelTests.test('sets up apd relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = personnel.apd.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apd'),
      'sets up the relationship mapping to an apd'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  apdKeyPersonnelModelTests.test(
    'personnel model sets up yearly cost relationship',
    async test => {
      const self = {
        hasMany: sinon.stub().returns('baz')
      };

      const output = personnel.years.bind(self)();

      test.ok(
        self.hasMany.calledWith('apdKeyPersonnelYear', 'apd_key_personnel_id'),
        'sets up the relationship mapping to years'
      );
      test.equal(output, 'baz', 'returns the expected value');
    }
  );

  apdKeyPersonnelModelTests.test('overrides toJSON method', async jsonTests => {
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

tap.test('state personnel cost data model', async yearTests => {
  yearTests.test('setup', async test => {
    test.match(
      year,
      {
        tableName: 'apd_key_personnel_years',
        personnel: Function,
        static: {
          updateableFields: ['year', 'cost', 'fte']
        }
      },
      'get the expected model definitions'
    );
  });

  yearTests.test(
    'personnel cost model sets up personnel relationship',
    async test => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = year.personnel.bind(self)();

      test.ok(
        self.belongsTo.calledWith('apdKeyPersonnel'),
        'sets up the relationship mapping to a state personnel'
      );
      test.equal(output, 'baz', 'returns the expected value');
    }
  );

  yearTests.test('validation', async validationTests => {
    const self = { attributes: { fte: 0, year: 0 } };
    validationTests.test(
      'fails if the year is too early or too late',
      async test => {
        self.attributes.year = 2009;
        test.rejects(year.validate.bind(self), 'rejects if year is too early');
        self.attributes.year = 3001;
        test.rejects(year.validate.bind(self), 'rejects if year is too late');
      }
    );

    validationTests.test(
      'fails if FTE is too small or too large',
      async test => {
        self.attributes.year = 2019;
        self.attributes.fte = -0.3;
        test.rejects(year.validate.bind(self), 'rejects if fte is negative');

        self.attributes.fte = 1.3;
        test.rejects(year.validate.bind(self), 'rejects if fte is over 100%');
      }
    );

    validationTests.test('succeeds if data is valid', async test => {
      self.attributes.year = 2019;
      self.attributes.fte = 0.5;
      test.resolves(year.validate.bind(self), 'resolves if year is valid');
    });
  });

  yearTests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub() };
    self.get.returns('--- unknown field ---');
    self.get.withArgs('id').returns('id field');
    self.get.withArgs('cost').returns('cost field');
    self.get.withArgs('fte').returns('fte field');
    self.get.withArgs('year').returns('year field');

    const output = year.toJSON.bind(self)();

    test.same(output, {
      id: 'id field',
      cost: 'cost field',
      fte: 'fte field',
      year: 'year field'
    });
  });
});
