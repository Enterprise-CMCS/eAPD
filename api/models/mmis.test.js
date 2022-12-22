import tap from 'tap';
import { applyPatch } from 'fast-json-patch';
import { APD_TYPE } from '@cms-eapd/common';

import { setup, teardown } from '../db/mongodb.js';
import { MMIS } from './index.js';
import { mmis } from '../seeds/development/apds.js';

let apdId;

tap.test('MMIS model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const { _id } = await MMIS.create({
      status: 'draft',
      stateId: 'md',
      ...mmis
    });

    apdId = _id.toString();
  });

  t.test('get MMIS', async test => {
    const found = await MMIS.findOne({ _id: apdId }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the MMIS that was just added');
    test.ok(found.apdType === APD_TYPE.MMIS, 'MMIS is not a MMIS or MMIS'); // eslint-disable-line no-underscore-dangle
  });

  t.test('patch MMIS', async test => {
    const apdJSON = await MMIS.findOne({ _id: apdId }).lean();
    const { newDocument } = applyPatch(apdJSON, [
      {
        op: 'replace',
        path: '/activities/0/outcomes/0/metrics/0/metric',
        value: 'TEST VALUE'
      }
    ]);
    await MMIS.replaceOne({ _id: apdId }, newDocument, {
      multipleCastError: true,
      runValidators: true
    });

    const updatedApd = await MMIS.findOne({ _id: apdId }).lean();

    test.equal(
      updatedApd.activities[0].outcomes[0].metrics[0].metric,
      'TEST VALUE',
      'MMIS was patched'
    );
  });

  t.afterEach(async () => {
    await MMIS.deleteOne({ _id: apdId });
  });

  t.teardown(async () => {
    await teardown();
  });
});
