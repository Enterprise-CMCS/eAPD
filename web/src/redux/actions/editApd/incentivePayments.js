import { EDIT_APD } from './symbols';

/**
 * Set the EH count for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EH count value
 */
export const setIncentiveEHCount = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/proposedBudget/incentivePayments/ehCt/${year}/${quarter}`,
  value
});

/**
 * Set the EH payment for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EH payment value
 */
export const setIncentiveEHPayment = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/proposedBudget/incentivePayments/ehAmt/${year}/${quarter}`,
  value
});

/**
 * Set the EP count for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EP count value
 */
export const setIncentiveEPCount = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/proposedBudget/incentivePayments/epCt/${year}/${quarter}`,
  value
});

/**
 * Set the EP payment for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EP payment value
 */
export const setIncentiveEPPayment = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/proposedBudget/incentivePayments/epAmt/${year}/${quarter}`,
  value
});
