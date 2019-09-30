import { EDIT_APD } from './symbols';

export const setIncentiveEHCount = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/incentivePayments/ehCt/${year}/${quarter}`,
  value
});

export const setIncentiveEHPayment = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/incentivePayments/ehAmt/${year}/${quarter}`,
  value
});

export const setIncentiveEPCount = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/incentivePayments/epCt/${year}/${quarter}`,
  value
});

export const setIncentiveEPPayment = (year, quarter, value) => ({
  type: EDIT_APD,
  path: `/incentivePayments/epAmt/${year}/${quarter}`,
  value
});
