/* eslint-disable import/no-dynamic-require, global-require */
const Ajv = require('ajv').default;

// all schemas, except the base apd document schema
const schemas = [
  'definitions.json',
  'activity.json',
  'contractorResource.json',
  'costAllocation.json',
  'costAllocationNarrative.json',
  'expense.json',
  'federalCitations.json',
  'incentivePayments.json',
  'keyPersonnel.json',
  'outcome.json',
  'person.json',
  'previousActivityExpenses.json',
  'stateProfile.json'
].map(schema => require(`./${schema}`));

const apdSchema = require('./apd.json');

const options = {
  allErrors: true,
  // Do not remove APD fields when testing. Our example APD documents should not
  // have any additional or extraneous fields. Ideally, this would be false, always.
  removeAdditional: process.env.NODE_ENV !== 'test',
  schemas
};

const ajv = new Ajv(options);
ajv.addFormat('custom-date-time', dateTimeString => {
  if (dateTimeString) {
    const isoRegex = /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$|^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))$/;
    return dateTimeString.match(isoRegex);
  }
  return true;
});

const validateApd = ajv.compile(apdSchema);

module.exports = {
  validateApd
};
