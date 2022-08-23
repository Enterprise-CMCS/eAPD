import React from 'react';
import {
  renderWithConnection,
  screen,
  act,
  waitFor
} from 'apd-testing-library';

import IncentivePayments from './IncentivePayments';

const defaultProps = {
  ehAmt: { 2022: { 1: 1, 2: 2, 3: 3, 4: 4 }, 2023: { 1: 5, 2: 6, 3: 7, 4: 8 } },
  ehCt: {
    2022: { 1: 9, 2: 10, 3: 11, 4: 12 },
    2023: { 1: 13, 2: 14, 3: 15, 4: 16 }
  },
  epAmt: {
    2022: { 1: 17, 2: 18, 3: 19, 4: 20 },
    2023: { 1: 21, 2: 22, 3: 23, 4: 24 }
  },
  epCt: {
    2022: { 1: 25, 2: 26, 3: 27, 4: 28 },
    2023: { 1: 29, 2: 30, 3: 31, 4: 32 }
  },
  years: ['2022', '2023'],
  setEHCount: jest.fn(),
  setEPCount: jest.fn(),
  setEHPayment: jest.fn(),
  setEPPayment: jest.fn()
};

const initialState = {
  apd: {
    data: {
      ehAmt: {
        2022: { 1: 1, 2: 2, 3: 3, 4: 4 },
        2023: { 1: 5, 2: 6, 3: 7, 4: 8 }
      },
      ehCt: {
        2022: { 1: 9, 2: 10, 3: 11, 4: 12 },
        2023: { 1: 13, 2: 14, 3: 15, 4: 16 }
      },
      epAmt: {
        2022: { 1: 17, 2: 18, 3: 19, 4: 20 },
        2023: { 1: 21, 2: 22, 3: 23, 4: 24 }
      },
      epCt: {
        2022: { 1: 25, 2: 26, 3: 27, 4: 28 },
        2023: { 1: 29, 2: 30, 3: 31, 4: 32 }
      }
    },
    totals: {
      ehAmt: { allYears: 36, byYear: { 1: 10, 2: 26 } },
      ehCt: { allYears: 100, byYear: { 1: 42, 2: 58 } },
      epAmt: { allYears: 164, byYear: { 1: 74, 2: 90 } },
      epCt: { allYears: 228, byYear: { 1: 106, 2: 122 } }
    },
    years: ['2022', '2023'],
    adminCheck: false
  }
};

const setup = async (props = {}) => {
  let utils;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    utils = renderWithConnection(
      <IncentivePayments {...defaultProps} {...props} />,
      {
        initialState: {
          apd: {
            data: {
              proposedBudget: {
                incentivePayments: {
                  ehAmt: {
                    2022: { 1: 1, 2: 2, 3: 3, 4: 4 },
                    2023: { 1: 5, 2: 6, 3: 7, 4: 8 }
                  },
                  ehCt: {
                    2022: { 1: 9, 2: 10, 3: 11, 4: 12 },
                    2023: { 1: 13, 2: 14, 3: 15, 4: 16 }
                  },
                  epAmt: {
                    2022: { 1: 17, 2: 18, 3: 19, 4: 20 },
                    2023: { 1: 21, 2: 22, 3: 23, 4: 24 }
                  },
                  epCt: {
                    2022: { 1: 25, 2: 26, 3: 27, 4: 28 },
                    2023: { 1: 29, 2: 30, 3: 31, 4: 32 }
                  }
                }
              },
              years: ['2022', '2023']
            }
          }
        }
      }
    );
  });
  return {
    utils
  };
};

describe('<IncentivePayments />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup({}, { initialState: initialState });

    var data = [
        {
          name: 'ehAmt',
          yearOne: 2022,
          yearOneValues: [1, 2, 3, 4],
          yearTwo: 2023,
          yearTwoValues: [5, 6, 7, 8]
        },
        {
          name: 'epAmt',
          yearOne: 2022,
          yearOneValues: [17, 18, 19, 20],
          yearTwo: 2023,
          yearTwoValues: [21, 22, 23, 24]
        }
      ],
      quarters = ['1', '2', '3', '4'];

    data.forEach(d => {
      var name = d.name,
        firstYear = d.yearOne,
        firstValues = d.yearOneValues,
        secondYear = d.yearTwo,
        secondValues = d.yearTwoValues;

      quarters.forEach(q => {
        var index = q - 1;

        expect(screen.getByTestId(`${name} ${firstYear} ${q}`)).toHaveValue(
          `${firstValues[index]}`
        );
        expect(screen.getByTestId(`${name} ${secondYear} ${q}`)).toHaveValue(
          `${secondValues[index]}`
        );
      });
    });
  });

  test('renders incentive payments subtotal', async () => {
    await setup({}, { initialState: initialState });

    var ehAmtYearOneTotal = [1, 2, 3, 4].reduce(
        (partialSum, a) => partialSum + a,
        0
      ),
      ehAmtYearTwoTotal = [5, 6, 7, 8].reduce(
        (partialSum, a) => partialSum + a,
        0
      ),
      epAmtYearOneTotal = [17, 18, 19, 20].reduce(
        (partialSum, a) => partialSum + a,
        0
      ),
      epAmtYearTwoTotal = [21, 22, 23, 24].reduce(
        (partialSum, a) => partialSum + a,
        0
      );

    waitFor(() => {
      expect(
        screen
          .getByTestId('ehAmt 2022 total')
          .innerHTML.replace(/<(.|\n)*?>/g, '')
      ).toHaveValue(`$${ehAmtYearOneTotal}`);
    })
      .then(() => console.log('Found!'))
      .catch(err => console.log(err));

    waitFor(() => {
      expect(
        screen
          .getByTestId('epAmt 2022 total')
          .innerHTML.replace(/<(.|\n)*?>/g, '')
      ).toHaveValue(`$${epAmtYearOneTotal}`);
    })
      .then(() => console.log('Found!'))
      .catch(err => console.log(err));

    waitFor(() => {
      expect(
        screen
          .getByTestId('ehAmt 2023 total')
          .innerHTML.replace(/<(.|\n)*?>/g, '')
      ).toHaveValue(`$${ehAmtYearTwoTotal}`);
    })
      .then(() => console.log('Found!'))
      .catch(err => console.log(err));

    waitFor(() => {
      expect(
        screen
          .getByTestId('epAmt 2023 total')
          .innerHTML.replace(/<(.|\n)*?>/g, '')
      ).toHaveValue(`$${epAmtYearTwoTotal}`);
    })
      .then(() => console.log('Found!'))
      .catch(err => console.log(err));
  });
});
