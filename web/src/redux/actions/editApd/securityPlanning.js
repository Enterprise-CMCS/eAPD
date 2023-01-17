import { EDIT_APD } from './symbols';

/**
 * Set a summary for Security Interface Plan
 * @param {String} text New summary text
 */
export const setSecurityInterfacePlan = text => ({
  type: EDIT_APD,
  path: '/securityPlanning/securityAndInterfacePlan',
  value: text
});

/**
 * Set a summary for Business Continuity and Disaster Recovery Plan
 * @param {String} text New summary text
 */
export const setBCDRPlan = text => ({
  type: EDIT_APD,
  path: '/securityPlanning/businessContinuityAndDisasterRecovery',
  value: text
});
