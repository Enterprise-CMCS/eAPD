import tap from 'tap';
import fastPatch from 'fast-json-patch';
import { APD_TYPE } from '@cms-eapd/common';

import { setup, teardown } from '../db/mongodb.js';
import { HITECH } from './index.js';
import { hitech } from '../seeds/development/apds.js';

let apdId;

tap.test('HITECH model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const { _id } = await HITECH.create({
      status: 'draft',
      stateId: 'na',
      ...hitech
    });

    apdId = _id.toString();
  });

  t.test('get HITECH', async test => {
    const found = await HITECH.findOne({ _id: apdId }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the HITECH that was just added');
    test.ok(
      found.apdType === APD_TYPE.HITECH,
      'HITECH is not a HITECH or MMIS'
    ); // eslint-disable-line no-underscore-dangle
  });

  t.test('patch HITECH', async test => {
    const apdJSON = await HITECH.findOne({ _id: apdId }).lean();
    const { newDocument } = fastPatch.applyPatch(apdJSON, [
      {
        op: 'replace',
        path: '/activities/0/outcomes/1/metrics/1/metric',
        value: 'TEST VALUE'
      }
    ]);
    await HITECH.replaceOne({ _id: apdId }, newDocument, {
      multipleCastError: true,
      runValidators: true
    });

    const updatedApd = await HITECH.findOne({ _id: apdId }).lean();

    test.equal(
      updatedApd.activities[0].outcomes[1].metrics[1].metric,
      'TEST VALUE',
      'HITECH was patched'
    );
  });

  t.afterEach(async () => {
    await HITECH.deleteOne({ _id: apdId });
  });

  t.teardown(async () => {
    await teardown();
  });
});
