/* eslint-disable import/no-dynamic-require, global-require */
const Ajv = require('ajv').default;

// all schemas, except the base apd document schema
const schemas = [
  'definitions.json',
  'apdOverview.json',
  'activity.json',
  'contractorResource.json',
  'costAllocation.json',
  'costAllocationNarrative.json',
  'expense.json',
  'assurancesAndCompliances.json',
  'proposedBudget.json',
  'previousActivities.json',
  'incentivePayments.json',
  'keyStatePersonnel.json',
  'keyPersonnel.json',
  'outcome.json',
  'person.json',
  'actualExpenditures.json'
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
    return !isNaN(Date.parse(dateTimeString)); // eslint-disable-line no-restricted-globals
  }
  return true;
});

const validateApd = ajv.compile(apdSchema);

module.exports = {
  validateApd
};
