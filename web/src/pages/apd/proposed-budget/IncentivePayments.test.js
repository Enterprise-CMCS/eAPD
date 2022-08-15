import React from 'react';
import {
  renderWithConnection
} from 'apd-testing-library';

import {
  plain as IncentivePayments,
  mapStateToProps,
  mapDispatchToProps
} from './IncentivePayments';

import {
  setIncentiveEHCount,
  setIncentiveEPCount,
  setIncentiveEHPayment,
  setIncentiveEPPayment
} from '../../../redux/actions/editApd';

const defaultProps = {
  data: {
    ehAmt: { 2022: [1, 2, 3, 4], 2023: [5, 6, 7, 8] },
    ehCt: { 2022: [9, 10, 11, 12], 2023: [13, 14, 15, 16] },
    epAmt: { 2022: [17, 18, 19, 20], 2023: [21, 22, 23, 24] },
    epCt: { 2022: [25, 26, 27, 28], 2023: [29, 30, 31, 32] }
  },
  totals: {
    ehAmt: { allYears: 36, byYear: { 1: 10, 2: 26 } },
    ehCt: { allYears: 100, byYear: { 1: 42, 2: 58 } },
    epAmt: { allYears: 164, byYear: { 1: 74, 2: 90 } },
    epCt: { allYears: 228, byYear: { 1: 106, 2: 122 } }
  },
  years: ['2022', '2023'],
  setEHCount: jest.fn(),
  setEPCount: jest.fn(),
  setEHPayment: jest.fn(),
  setEPPayment: jest.fn()
}

const setup = (props = {}) => {
  renderWithConnection(<IncentivePayments {...defaultProps} {...props} />);
};

describe('<IncentivePayments />', () =>{
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup();

    expect(<IncentivePayments />).toMatchSnapshot();
  })

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            proposedBudget: {
              incentivePayments: {
                ehAmt: { 2022: [1, 2, 3, 4], 2023: [5, 6, 7, 8] },
                ehCt: { 2022: [9, 10, 11, 12], 2023: [13, 14, 15, 16] },
                epAmt: { 2022: [17, 18, 19, 20], 2023: [21, 22, 23, 24] },
                epCt: { 2022: [25, 26, 27, 28], 2023: [29, 30, 31, 32] }
              }
            },
            years: ['2022', '2023']
          }
        }
      })
    ).toEqual({
      data: {
        ehAmt: { 2022: [1, 2, 3, 4], 2023: [5, 6, 7, 8] },
        ehCt: { 2022: [9, 10, 11, 12], 2023: [13, 14, 15, 16] },
        epAmt: { 2022: [17, 18, 19, 20], 2023: [21, 22, 23, 24] },
        epCt: { 2022: [25, 26, 27, 28], 2023: [29, 30, 31, 32] }
      },
      totals: {
        ehAmt: { allYears: 36, byYear: { 2022: 10, 2023: 26 } },
        ehCt: { allYears: 100, byYear: { 2022: 42, 2023: 58 } },
        epAmt: { allYears: 164, byYear: { 2022: 74, 2023: 90 } },
        epCt: { allYears: 228, byYear: { 2022: 106, 2023: 122 } }
      },
      years: ['2022', '2023']
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setEHCount: setIncentiveEHCount,
      setEPCount: setIncentiveEPCount,
      setEHPayment: setIncentiveEHPayment,
      setEPPayment: setIncentiveEPPayment
    });
  });
});
