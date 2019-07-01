const tap = require('tap');
const sinon = require('sinon');

const version = require('./apdVersion')().apdVersion;

tap.test('apd versions data model', async versionsTests => {
  const sandbox = sinon.createSandbox();
  versionsTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  versionsTests.test('setup', async test => {
    test.match(
      version,
      {
        tableName: 'apd_versions',
        apd: Function,
        user: Function,
        format: Function,
        toJSON: Function,
        static: { updateableFields: ['content'] }
      },
      'get the expected model definitions'
    );
  });

  versionsTests.test('sets up relationships', async test => {
    const self = {
      belongsTo: sandbox.stub()
    };
    self.belongsTo.withArgs('apd').returns('belongs to apd');
    self.belongsTo.withArgs('user').returns('belongs to user');

    const apd = version.apd.bind(self)();
    const user = version.user.bind(self)();

    test.ok(self.belongsTo.calledWith('apd'), 'sets apd relationship');
    test.ok(self.belongsTo.calledWith('user'), 'sets user relationship');
    test.equal(apd, 'belongs to apd', 'returns the expected value');
    test.equal(user, 'belongs to user', 'returns the expected value');
  });

  versionsTests.test('stringifies content', async test => {
    const out = version.format({ content: { hello: 'world' } });
    test.match(out, { content: '{"hello":"world"}' }, 'stringifies');
  });

  versionsTests.test('has toJSON', async test => {
    const self = {
      get: sinon.stub(),
      related: sinon.stub()
    };
    self.get.withArgs('id').returns('version-id');
    self.get.withArgs('apd_id').returns('apd-id');
    self.related.withArgs('user').returns('user-relation');
    self.get.withArgs('timestamp').returns('version-timestamp');
    self.get.withArgs('content').returns('version-content');

    const json = version.toJSON.bind(self)();

    test.match(
      json,
      {
        id: 'version-id',
        apd: 'apd-id',
        user: 'user-relation',
        timestamp: 'version-timestamp',
        content: 'version-content'
      },
      'JSON-ifies object'
    );
  });
});
