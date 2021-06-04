const tap = require('tap');

const mongo = require('../db/mongodb');
const APD = require('./apd');
const {
  apd: { document }
} = require('../seeds/development/apds');

let newApd;
let connection;

tap.test('APD model test', async t => {
  t.before(async () => {
    connection = await mongo.setup();
  });

  t.beforeEach(async () => {
    newApd = new APD({
      status: 'draft',
      stateId: 'md',
      ...document
    });
    newApd = await newApd.save();
  });

  t.test('get APD', async test => {
    const found = await APD.findOne({ _id: newApd._id }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the APD that was just added');
  });

  t.test('patch APD', async test => {
    await newApd.jsonPatch([
      {
        op: 'replace',
        path: '/activities/0/outcomes/1/metrics/1/metric',
        value: 'TEST VALUE'
      }
    ]);

    test.equal(
      newApd.activities[0].outcomes[1].metrics[1].metric,
      'TEST VALUE',
      'APD was patched'
    );
  });

  t.afterEach(async () => {
    await newApd.remove();
  });

  t.teardown(async () => {
    connection.close();
  });
});
