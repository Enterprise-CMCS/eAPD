const tap = require('tap');
const { apd } = require('./apds');

const { validateApd } = require('../../schemas');

tap.test('development APD seed document', async t => {
  t.ok(validateApd(apd), 'is valid, according to apd.json schema');
  t.notOk(validateApd.errors, 'has no reported errors');

  if (validateApd.errors) {
    t.equal([], validateApd.errors, 'has empty array of errors');
  }
});
