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
 * Set the total amount approved for MMIS activities for MMIS APDs
 * @param {String} year Federal fiscal year, four-digit
 * @param {Number} expense Total approved HIE/HIT for the year
 * @param {Number} level FFP Percentage, [50, 75, 90]
 * @param {String} fundingType DDI or M&O
 */
export const setPreviousActivityApprovedExpense = (
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
 * @param {String} fundingType DDI or M&O
 */
export const setPreviousActivityFederalActualExpense = (
  year,
  expense,
  level,
  fundingType
) => ({
  type: EDIT_APD,
  path: `/previousActivities/actualExpenditures/${year}/${fundingType}/${level}/federalActual`,
  value: expense
});
