import { EDIT_APD } from './symbols';

/**
 * Sets the complying true/false flag for one of the procurement citations
 * @param {Number} index Which citation to update
 * @param {Boolean} complying The new compliance value
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setComplyingWithProcurement = (index, complying) => ({
  type: EDIT_APD,
  path: `/federalCitations/procurement/${index}/checked`,
  value: complying
});

/**
 * Sets a justification for one of the procurement citations
 * @param {Number} index Which citation to update
 * @param {Boolean} justification The new justification
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setJustificationForProcurement = (index, justification) => ({
  type: EDIT_APD,
  path: `/federalCitations/procurement/${index}/explanation`,
  value: justification
});

/**
 * Sets the complying true/false flag for one of the records access citations
 * @param {Number} index Which citation to update
 * @param {Boolean} complying The new compliance value
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setComplyingWithRecordsAccess = (index, complying) => ({
  type: EDIT_APD,
  path: `/federalCitations/recordsAccess/${index}/checked`,
  value: complying
});

/**
 * Sets a justification for one of the records access citations
 * @param {Number} index Which citation to update
 * @param {Boolean} justification The new justification
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setJustificationForRecordsAccess = (index, justification) => ({
  type: EDIT_APD,
  path: `/federalCitations/recordsAccess/${index}/explanation`,
  value: justification
});

/**
 * Sets the complying true/false flag for one of the security citations
 * @param {Number} index Which citation to update
 * @param {Boolean} complying The new compliance value
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setComplyingWithSecurity = (index, complying) => ({
  type: EDIT_APD,
  path: `/federalCitations/security/${index}/checked`,
  value: complying
});

/**
 * Sets a justification for one of the security citations
 * @param {Number} index Which citation to update
 * @param {Boolean} justification The new justification
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setJustificationForSecurity = (index, justification) => ({
  type: EDIT_APD,
  path: `/federalCitations/security/${index}/explanation`,
  value: justification
});

/**
 * Sets the complying true/false flag for one of the software rights citations
 * @param {Number} index Which citation to update
 * @param {Boolean} complying The new compliance value
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setComplyingWithSoftwareRights = (index, complying) => ({
  type: EDIT_APD,
  path: `/federalCitations/softwareRights/${index}/checked`,
  value: complying
});

/**
 * Sets a justification for one of the software rights citations
 * @param {Number} index Which citation to update
 * @param {Boolean} justification The new justification
 * @returns {Object} A redux action, ready to be dispatched
 */
export const setJustificationForSoftwareRights = (index, justification) => ({
  type: EDIT_APD,
  path: `/federalCitations/softwareRights/${index}/explanation`,
  value: justification
});
