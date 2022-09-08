const {
  activitiesDashboard,
  activityOverview,
  apdOverview,
  keyMedicaid,
  keyPerson,
  nameAndFundingSource,
  outcomeMetric,
  perconCost,
  plannedActivitySchedule,
  privateContractor,
  nonPersonnelCosts,
  standardsAndConditions,
  statePersonnel,
  milestones
} = require('@cms-eapd/common');

// combine all schemas into one and validate once
// alternatively: loop through each section of APD and validate against respective schema
// compile all errors into new object (based on expectations from frontend)
// return the object of validation errors or null if there are no errors
const validateAPDDoc = apd => {
  console.log('test', activitiesDashboard.validate([]));
  return apd;
};

module.exports = {
  validateAPDDoc
};
