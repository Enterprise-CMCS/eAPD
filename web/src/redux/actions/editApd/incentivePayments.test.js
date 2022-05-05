import { EDIT_APD } from './symbols';
import {
  setIncentiveEHCount,
  setIncentiveEHPayment,
  setIncentiveEPCount,
  setIncentiveEPPayment
} from './incentivePayments';

describe('APD edit actions for incentive payments', () => {
  it('dispatches an action for setting the EH count for a fiscal year and quarter', () => {
    expect(setIncentiveEHCount('year', 'quarter', 34)).toEqual({
      type: EDIT_APD,
      path: '/proposedBudget/incentivePayments/ehCt/year/quarter',
      value: 34
    });
  });

  it('dispatches an action for setting the EH payment for a fiscal year and quarter', () => {
    expect(setIncentiveEHPayment('year', 'quarter', 74)).toEqual({
      type: EDIT_APD,
      path: '/proposedBudget/incentivePayments/ehAmt/year/quarter',
      value: 74
    });
  });

  it('dispatches an action for setting the EC count for a fiscal year and quarter', () => {
    expect(setIncentiveEPCount('year', 'quarter', 735)).toEqual({
      type: EDIT_APD,
      path: '/proposedBudget/incentivePayments/epCt/year/quarter',
      value: 735
    });
  });

  it('dispatches an action for setting the EC payment for a fiscal year and quarter', () => {
    expect(setIncentiveEPPayment('year', 'quarter', 24)).toEqual({
      type: EDIT_APD,
      path: '/proposedBudget/incentivePayments/epAmt/year/quarter',
      value: 24
    });
  });
});
