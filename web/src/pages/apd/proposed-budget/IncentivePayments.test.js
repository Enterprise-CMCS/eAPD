import React from 'react';
import {
  renderWithConnection,
  screen,
  act
} from 'apd-testing-library';

import IncentivePayments from './IncentivePayments';

import {
  setIncentiveEHCount,
  setIncentiveEPCount,
  setIncentiveEHPayment,
  setIncentiveEPPayment
} from '../../../redux/actions/editApd';

const defaultProps = {
  data: {
    ehAmt: { 2022: {1:1, 2:2, 3:3, 4:4}, 2023: {1:5, 2:6, 3:7, 4:8} },
    ehCt: { 2022: {1:9, 2:10, 3:11, 4:12}, 2023: {1:13, 2:14, 3:15, 4:16} },
    epAmt: { 2022: {1:17, 2:18, 3:19, 4:20}, 2023: {1:21, 2:22, 3:23, 4:24} },
    epCt: { 2022: {1:25, 2:26, 3:27, 4:28}, 2023: {1:29, 2:30, 3:31, 4:32} }
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

const setup = async (props = {}) => {
  let utils;
  await act(async () => {
    utils = renderWithConnection(<IncentivePayments {...defaultProps} {...props} />, {
      initialState: {
        apd: {
          data: {
            proposedBudget: {
              incentivePayments: {
                ehAmt: { 2022: {1:1, 2:2, 3:3, 4:4}, 2023: {1:5, 2:6, 3:7, 4:8} },
                ehCt: { 2022: {1:9, 2:10, 3:11, 4:12}, 2023: {1:13, 2:14, 3:15, 4:16} },
                epAmt: { 2022: {1:17, 2:18, 3:19, 4:20}, 2023: {1:21, 2:22, 3:23, 4:24} },
                epCt: { 2022: {1:25, 2:26, 3:27, 4:28}, 2023: {1:29, 2:30, 3:31, 4:32} }
              }
            },
            years: ['2022', '2023']
          }
        }
      }
    });
  })
  return {
    utils
  }
};

describe('<IncentivePayments />', () =>{
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', async () => {
    await setup();

    expect(screen.getByTestId('ehAmt 2022 1')).toHaveValue('1');
    expect(screen.getByTestId('ehAmt 2022 2')).toHaveValue('2');
    expect(screen.getByTestId('ehAmt 2022 3')).toHaveValue('3');
    expect(screen.getByTestId('ehAmt 2022 4')).toHaveValue('4');
    expect(screen.getByTestId('ehAmt 2023 1')).toHaveValue('5');
    expect(screen.getByTestId('ehAmt 2023 2')).toHaveValue('6');
    expect(screen.getByTestId('ehAmt 2023 3')).toHaveValue('7');
    expect(screen.getByTestId('ehAmt 2023 4')).toHaveValue('8');

    expect(screen.getByTestId('epAmt 2022 1')).toHaveValue('17');
    expect(screen.getByTestId('epAmt 2022 2')).toHaveValue('18');
    expect(screen.getByTestId('epAmt 2022 3')).toHaveValue('19');
    expect(screen.getByTestId('epAmt 2022 4')).toHaveValue('20');
    expect(screen.getByTestId('epAmt 2023 1')).toHaveValue('21');
    expect(screen.getByTestId('epAmt 2023 2')).toHaveValue('22');
    expect(screen.getByTestId('epAmt 2023 3')).toHaveValue('23');
    expect(screen.getByTestId('epAmt 2023 4')).toHaveValue('24');
  });
});
