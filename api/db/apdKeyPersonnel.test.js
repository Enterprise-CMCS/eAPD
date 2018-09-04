const tap = require('tap');
const sinon = require('sinon');
const db = require('./apdKeyPersonnel')();

const keyPersonnel = db.apdKeyPersonnel;
const years = db.apdKeyPersonnelYearly;

tap.test('apd key personnel data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      keyPersonnel,
      {
        apd: Function,
        years: Function,
        format: Function,
        toJSON: Function,
        static: {
          updateableFields: [
            'email',
            'isPrimary',
            'name',
            'percentTime',
            'position'
          ],
          foreignKey: 'apd_key_personnel_id',
          owns: { costs: 'apdKeyPersonnelYearly' }
        },
        tableName: 'apd_key_personnel'
      },
      'get the expected model definitions'
    );
  });

  tests.test('sets up APD relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = keyPersonnel.apd.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apd'),
      'sets up the relationship mapping to an apd'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('sets up years relationship', async test => {
    const self = {
      hasMany: sinon.stub().returns('floof')
    };

    const output = keyPersonnel.years.bind(self)();

    test.ok(
      self.hasMany.calledWith('apdKeyPersonnelYearly'),
      'sets up the relationship mapping to years'
    );
    test.equal(output, 'floof', 'returns the expected value');
  });

  tests.test('formats attributes', async test => {
    const attrs = {
      id: 'id',
      name: 'name',
      position: 'position',
      email: 'email',
      isPrimary: true,
      percentTime: 400,
      apd_id: 99,
      prop: 'gets thrown out'
    };

    const output = keyPersonnel.format(attrs);

    test.same(output, {
      id: 'id',
      name: 'name',
      position: 'position',
      email: 'email',
      is_primary: true,
      percent_time: 400,
      apd_id: 99
    });
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub(), related: sinon.stub() };
    self.get.withArgs('id').returns('76');
    self.get.withArgs('name').returns('Trombones');
    self.get.withArgs('position').returns('Leaders');
    self.get.withArgs('email').returns('trombones@bigparade.com');
    self.get.withArgs('is_primary').returns('false');
    self.get.withArgs('percent_time').returns(32);
    self.related
      .withArgs('years')
      .returns({ length: 7, toJSON: () => 'years' });

    const output = keyPersonnel.toJSON.bind(self)();

    test.match(output, {
      id: '76',
      name: 'Trombones',
      position: 'Leaders',
      email: 'trombones@bigparade.com',
      hasCosts: true,
      isPrimary: 'false',
      percentTime: 32,
      costs: 'years'
    });
  });
});

tap.test('apd key personnel years data model', async tests => {
  tests.test('setup', async test => {
    test.match(years, {
      personnel: Function,
      toJSON: Function,
      static: {
        updateableFields: ['year', 'cost']
      },
      tableName: 'apd_key_personnel_yearly'
    });
  });

  tests.test('sets up key personnel relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = years.personnel.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apdKeyPersonnel'),
      'sets up the relationship mapping to a key personnel'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('overrides toJSON method', async test => {
    const self = {
      get: sinon.stub()
    };
    self.get.withArgs('cost').returns('cost');
    self.get.withArgs('year').returns('year');

    const output = years.toJSON.bind(self)();

    test.same(output, { cost: 'cost', year: 'year' });
  });
});
