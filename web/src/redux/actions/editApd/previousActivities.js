import { EDIT_APD } from './symbols';

/**
 * Set a summary for the previous activies
 * @param {String} summary New summary text
 */
export const setPreviousActivitySummary = summary => ({
  type: EDIT_APD,
  path: '/previousActivities/previousActivitySummary',
  value: summary
});

/**
 * Set the total amount approved for HIE/HIT activities in a previous federal
 * fiscal year.
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 */
export const setPreviousActivityApprovedExpenseForHITandHIE = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/hithie/totalApproved`,
  value: expense
});

/**
 * Set the actual federal amount spent on HIE/HIT activities in a previous
 * federal fiscal year
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 */
export const setPreviousActivityFederalActualExpenseForHITandHIE = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/hithie/federalActual`,
  value: expense
});

/**
 * Set the total amount approved for MMIS activities for HITECH APDs
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 * @param {Number} level FFP Percentage, [50, 75, 90]
 */
export const setPreviousActivityApprovedExpenseforMMISOld = (
  year,
  expense,
  level
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/${level}/totalApproved`,
  value: expense
});

/**
 * Set the total amount approved for MMIS activities for MMIS APDs
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 * @param {Number} level FFP Percentage, [50, 75, 90]
 * @param {String} fundingType DDI or M&O
 */
export const setPreviousActivityApprovedExpenseforMMISNew = (
  year,
  expense,
  level,
  fundingType
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/${fundingType}/${level}/totalApproved`,
  value: expense
});

/**
 * Set the actual federal amount spent on MMIS activities for HITECH APDs
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 * @param {Number} level FFP Percentage, [50, 75, 90]
 */
export const setPreviousActivityFederalActualExpenseforMMISOld = (
  year,
  expense,
  level
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/${level}/federalActual`,
  value: expense
});

/**
 * Set the actual federal amount spent on MMIS activities for HITECH APDs
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 * @param {Number} level FFP Percentage, [50, 75, 90]
 * @param {String} fundingType DDI or M&O
 */
export const setPreviousActivityFederalActualExpenseforMMISNew = (
  year,
  expense,
  level,
  fundingType
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/${fundingType}/${level}/federalActual`,
  value: expense
});
