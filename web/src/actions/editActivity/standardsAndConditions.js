import { EDIT_APD } from '../editApd/symbols';

export const setActivityStandardAndConditionDoesNotSupportExplanation = (
  activityIndex,
  explanation
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/standardsAndConditions/doesNotSupport`,
  value: explanation
});

export const setActivityStandardAndConditionSupportExplanation = (
  activityIndex,
  explanation
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/standardsAndConditions/supports`,
  value: explanation
});
