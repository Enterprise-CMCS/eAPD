const tap = require('tap');
const toMongodb = require('jsonpatch-to-mongodb');

const { setup, teardown } = require('../db/mongodb');
const { APD } = require('./index');
const { apd } = require('../seeds/development/apds');

let apdId;

tap.test('APD model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const { _id } = await APD.create({
      status: 'draft',
      stateId: 'md',
      ...apd
    });
    apdId = _id.toString();
  });

  t.test('get APD', async test => {
    const found = await APD.findOne({ _id: apdId }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the APD that was just added');
  });

  t.test('patch APD', async test => {
    await APD.updateOne(
      { _id: apdId },
      toMongodb([
        {
          op: 'replace',
          path: '/activities/0/outcomes/1/metrics/1/metric',
          value: 'TEST VALUE'
        }
      ])
    );

    const updatedApd = await APD.findOne({ _id: apdId }).exec();

    test.equal(
      updatedApd.activities[0].outcomes[1].metrics[1].metric,
      'TEST VALUE',
      'APD was patched'
    );
  });

  t.afterEach(async () => {
    await APD.deleteOne({ _id: apdId });
  });

  t.teardown(async () => {
    await teardown();
  });
});
