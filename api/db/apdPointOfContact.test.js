const tap = require('tap');
const sinon = require('sinon');

const poc = require('./apdPointOfContact')().apdPointOfContact;

tap.test('apd points of contact data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      poc,
      {
        apd: Function,
        toJSON: Function,
        static: {
          updateableFields: ['name', 'position', 'email']
        },
        tableName: 'apd_points_of_contact'
      },
      'get the expected model definitions'
    );
  });

  tests.test('sets up APD relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = poc.apd.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apd'),
      'sets up the relationship mapping to an apd'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('76');
    self.get.withArgs('name').returns('Trombones');
    self.get.withArgs('position').returns('Leaders');
    self.get.withArgs('email').returns('trombones@bigparade.com');

    const output = poc.toJSON.bind(self)();

    test.match(output, {
      id: '76',
      name: 'Trombones',
      position: 'Leaders',
      email: 'trombones@bigparade.com'
    });
  });
});
