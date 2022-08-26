const tap = require('tap');
const { data } = require('./apds');
const { createAPD } = require('../../db/apds');
const { setup, teardown } = require('../../db/mongodb');
const { APD } = require('../../models/index');

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
