import { EDIT_APD } from './symbols';

export const setPreviousActivitySummary = summary => ({
  type: EDIT_APD,
  path: '/previousActivitySummary',
  value: summary
});

export const setPreviousActivityApprovedExpenseForHITandHIE = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/hithie/totalApproved`,
  value: expense
});

export const setPreviousActivityFederalActualExpenseForHITandHIE = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/hithie/federalActual`,
  value: expense
});

export const setPreviousActivityApprovedExpenseforMMIS50FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/50/totalApproved`,
  value: expense
});

export const setPreviousActivityApprovedExpenseforMMIS75FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/75/totalApproved`,
  value: expense
});

export const setPreviousActivityApprovedExpenseforMMIS90FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/90/totalApproved`,
  value: expense
});

export const setPreviousActivityFederalActualExpenseforMMIS50FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/50/federalActual`,
  value: expense
});

export const setPreviousActivityFederalActualExpenseforMMIS75FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/75/federalActual`,
  value: expense
});

export const setPreviousActivityFederalActualExpenseforMMIS90FFP = (
  year,
  expense
) => ({
  type: EDIT_APD,
  path: `/previousActivityExpenses/${year}/mmis/90/federalActual`,
  value: expense
});
