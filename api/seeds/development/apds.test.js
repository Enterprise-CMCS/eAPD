const tap = require('tap');
const { data } = require('./apds');
const APD = require('../../models/apd');

tap.test('development APD seed document', async t => {
  let seedApd = new APD(data[0]);
  console.log("seedApd", seedApd);
  
  let validateApd = seedApd.validateSync();
  
  // console.log("validateApd", validateApd);
  // t.ok(validateApd(apd), 'is valid, according to apd.json schema');
  // t.notOk(validateApd.errors, 'has no reported errors');

  t.equal([], validateApd.errors, 'has empty array of errors');
});
