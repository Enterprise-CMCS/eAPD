const Ajv = require('ajv');

// all schemas, except the base apd document schema
const schemas = [
  "activity.json",
  "contractorResource.json",
  "costAllocation.json",
  "costAllocationNarrative.json",
  "definitions.json",
  "expense.json",
  "federalCitations.json",
  "incentivePayments.json",
  "keyPersonnel.json",
  "objective.json",
  "person.json",
  "previousActivityExpenses.json",
  "stateProfile.json"
].map(schema => require(`./${schema}`));

const apdSchema = require('./apd.json');

const options = {
  allErrors: true,
  jsonPointers: true,
  // Do not remove APD fields when testing. Our example APD documents should not
  // have any additional or extraneous fields. Ideally, this would be false, always.
  removeAdditional: process.env.NODE_ENV !== 'test'
};

const ajv = new Ajv(options);
schemas.forEach(schema => ajv.addSchema(schema));
const validateApd = ajv.compile(apdSchema);

module.exports = {
  validateApd
};
