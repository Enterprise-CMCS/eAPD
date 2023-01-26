import { EDIT_APD } from './symbols';

/**
 * Set the Medicaid Program and Priorities
 * @param {String} text New program and priorities text
 */
export const setProgramPriorities = text => ({
  type: EDIT_APD,
  path: `/statePrioritiesAndScope/programPriorities`,
  value: text
});

/**
 * Set the Enterprise System Intro
 * @param {String} text New enterprise system intro text
 */
export const setEnterpriseSystemIntro = text => ({
  type: EDIT_APD,
  path: `/statePrioritiesAndScope/enterpriseSystemIntro`,
  value: text
});

/**
 * Set the Scope of APD
 * @param {String} text New Scope of APD text
 */
export const setScopeOfAPD = text => ({
  type: EDIT_APD,
  path: `/statePrioritiesAndScope/scopeOfAPD`,
  value: text
});
