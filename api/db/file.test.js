const tap = require('tap');
const sinon = require('sinon');

const file = require('./file')().file;

tap.test('file data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      file,
      {
        tableName: 'files',
        activities: Function,
        contractors: Function,
        toJSON: Function
      },
      'get the expected model definitions'
    );
  });

  tests.test('sets up activity relationship', async test => {
    const self = {
      belongsToMany: sinon.stub().returns('baz')
    };

    const output = file.activities.bind(self)();

    test.ok(
      self.belongsToMany.calledWith(
        'apdActivity',
        'activity_files',
        'file_id',
        'activity_id'
      ),
      'sets up the relationship mapping to activities'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('sets up contractor relationship', async test => {
    const self = {
      belongsToMany: sinon.stub().returns('baz')
    };

    const output = file.contractors.bind(self)();

    test.ok(
      self.belongsToMany.calledWith(
        'apdActivityContractorResource',
        'activity_contractor_files',
        'file_id',
        'activity_contractor_resource_id'
      ),
      'sets up the relationship mapping to contractors'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('Big Ol File');
    self.get.withArgs('key').returns('opens locks');
    self.get.withArgs('size').returns('big ol');
    self.get.withArgs('metadata').returns('{"a":"json","string":"here"}');

    const output = file.toJSON.bind(self)();

    test.match(output, {
      id: 'Big Ol File',
      size: 'big ol',
      a: 'json',
      string: 'here'
    });
  });
});
