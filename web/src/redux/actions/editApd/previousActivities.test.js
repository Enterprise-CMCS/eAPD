import { EDIT_APD } from './symbols';
import {
  setPreviousActivitySummary,
  setPreviousActivityApprovedExpense,
  setPreviousActivityFederalActualExpense,
  setPreviousActivityFederalActualExpenseForHITandHIE,
  setPreviousActivityApprovedExpenseForHITandHIE
} from './previousActivities';

describe('APD edit actions for previous activities', () => {
  it('dispatches an action for setting the previous activity summary', () => {
    expect(setPreviousActivitySummary('summary')).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/previousActivitySummary',
      value: 'summary'
    });
  });

  it('dispatches an action for setting the total approved expenses for HIT/HIE in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpenseForHITandHIE('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/hithie/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 50% FFP in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 50, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/50/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 50% ddi FFP in a fiscal year - MMIS APD', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 50, 'ddi')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/ddi/50/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 75% ddi FFP in a fiscal year - MMIS APD', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 75, 'ddi')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/ddi/75/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 90% ddi FFP in a fiscal year - MMIS APD', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 90, 'ddi')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/ddi/90/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total actual expenses for MMIS at 50% mando FFP in a fiscal year - MMIS APD', () => {
    expect(
      setPreviousActivityFederalActualExpense('year', 'expense', 50, 'mando')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mando/50/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total actual expenses for MMIS at 75% mando FFP in a fiscal year - MMIS APD', () => {
    expect(
      setPreviousActivityFederalActualExpense('year', 'expense', 75, 'mando')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mando/75/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 75% FFP in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 75, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/75/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 90% FFP in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpense('year', 'expense', 90, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/90/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for HIT/HIE in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpenseForHITandHIE('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/hithie/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for MMIS at 50% in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpense('year', 'expense', 50, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/50/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for MMIS at 75% in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpense('year', 'expense', 75, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/75/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for MMIS at 90% in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpense('year', 'expense', 90, 'mmis')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/90/federalActual',
      value: 'expense'
    });
  });
});
