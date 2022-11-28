import tap from 'tap';
import { data } from './apds';
import { createAPD } from '../../db/apds';
import { setup, teardown } from '../../db/mongodb';
import { APD } from '../../models/index';

tap.test('development APD seed document', async t => {
  await setup();
  const apdId = await createAPD(data[0]);
  const apdDoc = await APD.findOne({ _id: apdId });
  const validateApd = await apdDoc.validate().then(errors => {
    if (errors) {
      return `errors: ${errors}`;
    }
    return 'is valid, according to mongoose schema';
  });
  await teardown();

  t.same(validateApd, 'is valid, according to mongoose schema');
});
