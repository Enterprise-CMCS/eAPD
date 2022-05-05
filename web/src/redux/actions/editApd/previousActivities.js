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
 * Set the total amount approved for MMIS activities at the 50/50 match level
 * in a previous federal fiscal year.
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 */
export const setPreviousActivityApprovedExpenseforMMIS50FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/50/totalApproved`,
  value: expense
});

/**
 * Set the total amount approved for MMIS activities at the 75/25 match level
 * in a previous federal fiscal year.
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 */
export const setPreviousActivityApprovedExpenseforMMIS75FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/75/totalApproved`,
  value: expense
});

/**
 * Set the total amount approved for MMIS activities at the 90/10 match level
 * in a previous federal fiscal year.
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 */
export const setPreviousActivityApprovedExpenseforMMIS90FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/90/totalApproved`,
  value: expense
});

/**
 * Set the actual federal amount spent on MMIS activities at the 50/50 match
 * level in a previous federal fiscal year
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 */
export const setPreviousActivityFederalActualExpenseforMMIS50FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/50/federalActual`,
  value: expense
});

/**
 * Set the actual federal amount spent on MMIS activities at the 75/25 match
 * level in a previous federal fiscal year
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 */
export const setPreviousActivityFederalActualExpenseforMMIS75FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/75/federalActual`,
  value: expense
});

/**
 * Set the actual federal amount spent on MMIS activities at the 90/10 match
 * level in a previous federal fiscal year
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Actual federal money spent
 */
export const setPreviousActivityFederalActualExpenseforMMIS90FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/mmis/90/federalActual`,
  value: expense
});
