import { EDIT_APD } from '../editApd/symbols';

export const setActivityOverview = (activityIndex, overview) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/summary`,
  value: overview
});

export const setActivityDescription = (activityIndex, description) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/description`,
  value: description
});

export const setActivityAlternatives = (activityIndex, alternatives) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/alternatives`,
  value: alternatives
});

export const setActivitySnapshot = (activityIndex, activitySnapshot) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/activitySnapshot`,
  value: activitySnapshot
});

export const setActivityProblemStatement = (
  activityIndex,
  problemStatement
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/problemStatement`,
  value: problemStatement
});

export const setActivityProposedSolution = (
  activityIndex,
  proposedSolution
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/activityOverview/proposedSolution`,
  value: proposedSolution
});
