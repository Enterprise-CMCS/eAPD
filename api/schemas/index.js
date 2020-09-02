const Ajv = require('ajv');

const apdSchema = require('./apd.json');

const ajv = new Ajv({
  allErrors: true,
  jsonPointers: true,
  removeAdditional: true
});

const validateApd = ajv.compile({
  ...apdSchema,
  additionalProperties: false
});

module.exports = {
  validateApd
};
