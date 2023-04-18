import tap from 'tap';
import fastPatch from 'fast-json-patch';
import { setup, teardown } from '../db/mongodb.js';
import { APD } from './index.js';
import { hitech as apd } from '../seeds/development/apds.js';

let apdId;
delete apd.apdType; // eslint-disable-line no-underscore-dangle

tap.test('APD model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const { _id } = await APD.create({
      status: 'draft',
      stateId: 'na',
      ...apd
    });

    apdId = _id.toString();
  });

  t.test('get APD', async test => {
    const found = await APD.findOne({ _id: apdId }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the APD that was just added');
    test.ok(!found.apdType, 'APD is not a HITECH or MMIS'); // eslint-disable-line no-underscore-dangle
  });

  t.test('patch APD', async test => {
    const apdJSON = await APD.findOne({ _id: apdId }).lean();
    const { newDocument } = fastPatch.applyPatch(apdJSON, [
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
