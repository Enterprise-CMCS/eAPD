const Ajv = require('ajv');

const apdSchema = require('./apd.json');

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  // Do not remove APD fields when testing. Our example APD documents should not
  // have any additional or extraneous fields. Ideally, this would be false, always.
  removeAdditional: process.env.NODE_ENV !== 'test'
});

const validateApd = ajv.compile({
  ...apdSchema,
  additionalProperties: false
});

module.exports = {
  validateApd
};
