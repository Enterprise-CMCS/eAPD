import { EDIT_APD } from '../editApd/symbols';

export const setEnhancedFundingQualification = (
  activityIndex,
  qualification
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/conditionsForEnhancedFunding/enhancedFundingQualification`,
  value: qualification
});

export const setEnhancedFundingJustification = (
  activityIndex,
  justification
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/conditionsForEnhancedFunding/enhancedFundingJustification`,
  value: justification
});
