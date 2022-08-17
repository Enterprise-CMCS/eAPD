const tap = require('tap');
const { data } = require('./apds');
const APD = require('../../models/apd');

tap.test('development APD seed document', async t => {
  const apdDoc = new APD(data[0]);
  const validateApd = await apdDoc.validate().then(errors => {
    if (errors) {
      return `errors: ${errors}`;
    }
    return 'is valid, according to mongoose schema';
  });

  t.same(validateApd, 'is valid, according to mongoose schema');
});
