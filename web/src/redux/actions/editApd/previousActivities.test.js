import { EDIT_APD } from './symbols';
import {
  setPreviousActivitySummary,
  setPreviousActivityApprovedExpenseForHITandHIE,
  setPreviousActivityApprovedExpenseforMMIS50FFP,
  setPreviousActivityApprovedExpenseforMMIS75FFP,
  setPreviousActivityApprovedExpenseforMMIS90FFP,
  setPreviousActivityFederalActualExpenseForHITandHIE,
  setPreviousActivityFederalActualExpenseforMMIS50FFP,
  setPreviousActivityFederalActualExpenseforMMIS75FFP,
  setPreviousActivityFederalActualExpenseforMMIS90FFP
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
      setPreviousActivityApprovedExpenseforMMIS50FFP('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/50/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 75% FFP in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpenseforMMIS75FFP('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/75/totalApproved',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the total approved expenses for MMIS at 90% FFP in a fiscal year', () => {
    expect(
      setPreviousActivityApprovedExpenseforMMIS90FFP('year', 'expense')
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
      setPreviousActivityFederalActualExpenseforMMIS50FFP('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/50/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for MMIS at 75% in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpenseforMMIS75FFP('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/75/federalActual',
      value: 'expense'
    });
  });

  it('dispatches an action for setting the actual federal expenses for MMIS at 90% in a fiscal year', () => {
    expect(
      setPreviousActivityFederalActualExpenseforMMIS90FFP('year', 'expense')
    ).toEqual({
      type: EDIT_APD,
      path: '/previousActivities/actualExpenditures/year/mmis/90/federalActual',
      value: 'expense'
    });
  });
});
