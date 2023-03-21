import { EDIT_APD } from '../editApd/symbols';

export const setAlternativeAnalysis = (activityIndex, alternativeAnalysis) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/analysisOfAlternativesAndRisks/alternativeAnalysis`,
  value: alternativeAnalysis
});

export const setCostBenefitAnalysis = (activityIndex, costBenefitAnalysis) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/analysisOfAlternativesAndRisks/costBenefitAnalysis`,
  value: costBenefitAnalysis
});

export const setFeasibilityStudy = (activityIndex, feasibilityStudy) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/analysisOfAlternativesAndRisks/feasibilityStudy`,
  value: feasibilityStudy
});

export const setRequirementsAnalysis = (
  activityIndex,
  requirementsAnalysis
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/analysisOfAlternativesAndRisks/requirementsAnalysis`,
  value: requirementsAnalysis
});

export const setForseeableRisks = (activityIndex, forseeableRisks) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/analysisOfAlternativesAndRisks/forseeableRisks`,
  value: forseeableRisks
});
