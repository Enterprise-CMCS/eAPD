import { EDIT_APD } from '../editApd/symbols';

const getAction = propertyName => (activityIndex, newValue) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/standardsAndConditions/${propertyName}`,
  value: newValue
});

export const setActivityStandardsBusinessResults = getAction('businessResults');
export const setActivityStandardsDocumentation = getAction('documentation');
export const setActivityStandardsIndustryStandards = getAction(
  'industryStandards'
);
export const setActivityStandardsInteroperability = getAction(
  'interoperability'
);
export const setActivityStandardsKeyPersonnel = getAction('keyPersonnel');
export const setActivityStandardsLeverage = getAction('leverage');
export const setActivityStandardsMinimizeCost = getAction('minimizeCost');
export const setActivityStandardsMITA = getAction('mita');
export const setActivityStandardsMitigationStrategy = getAction(
  'mitigationStrategy'
);
export const setActivityStandardsModularity = getAction('modularity');
export const setActivityStandardsReporting = getAction('reporting');
