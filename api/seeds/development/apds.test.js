const tap = require('tap');
const { apd } = require('./apds');

// const { validateApd } = require('../../schemas');
// Instead of importing 'validateApd', use more strict checks against schema.
//   e.g. - Don't remove additional properties from document object when
//          validating our seed data.
const apdSchema = require('../../schemas/apd.json');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const validateApd = ajv.compile({
  ...apdSchema,
  additionalProperties: false
});

tap.test('development APD document', async t => {
  t.true(validateApd(apd.document), 'is valid, according to apd.json schema');
  t.false(validateApd.errors, 'has no reported errors');

  if (validateApd.errors) {
    t.equal([], validApd.errors, 'has empty array of errors');
  }
});
