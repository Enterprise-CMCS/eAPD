const tap = require('tap');
const { applyPatch } = require('fast-json-patch');

const { setup, teardown } = require('../db/mongodb');
const { APD } = require('./index');
const { hitech: apd } = require('../seeds/development/apds');

let apdId;
delete apd.__t; // eslint-disable-line no-underscore-dangle

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
    test.ok(!found.__t, 'APD is not a HITECH or MMIS'); // eslint-disable-line no-underscore-dangle
  });

  t.test('patch APD', async test => {
    const apdJSON = await APD.findOne({ _id: apdId }).lean();
    const { newDocument } = applyPatch(apdJSON, [
      {
        op: 'replace',
        path: '/activities/0/outcomes/1/metrics/1/metric',
        value: 'TEST VALUE'
      }
    ]);
    await APD.replaceOne({ _id: apdId }, newDocument, {
      multipleCastError: true,
      runValidators: true
    });

    const updatedApd = await APD.findOne({ _id: apdId }).lean();

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
