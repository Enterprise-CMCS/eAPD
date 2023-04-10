import React from 'react';
import {
  renderWithConnection,
  screen,
  act,
  waitFor
} from 'apd-testing-library';

import MmisApdPreviousActivityTables, {
  mapStateToProps,
  mapDispatchToProps
} from './MmisApdPreviousActivityTables';

import {
  setPreviousActivityFederalActualExpense,
  setPreviousActivityApprovedExpense
} from '../../../redux/actions/editApd';

const defaultProps = {
  previousActivityExpense: {
    2021: {
      ddi: {
        50: {
          federalActual: 1234,
          totalApproved: 123456
        },
        75: {
          federalActual: 23456,
          totalApproved: 234567
        },
        90: {
          federalActual: 3456,
          totalApproved: 34567
        }
      },
      mando: {
        50: {
          federalActual: 4567,
          totalApproved: 45678
        },
        75: {
          federalActual: 5678,
          totalApproved: 56789
        }
      }
    },
    2022: {
      ddi: {
        50: {
          federalActual: 6789,
          totalApproved: 678910
        },
        75: {
          federalActual: 78910,
          totalApproved: 78911
        },
        90: {
          federalActual: 78912,
          totalApproved: 78913
        }
      },
      mando: {
        50: {
          federalActual: 78914,
          totalApproved: 78915
        },
        75: {
          federalActual: 78916,
          totalApproved: 78917
        }
      }
    }
  },
  setActual: jest.fn(),
  setApproved: jest.fn()
};

const initialState = {
  apd: {
    data: {
      previousActivities: {
        previousActivitySummary: '',
        actualExpenditures: {
          2021: {
            ddi: {
              50: {
                federalActual: 1234,
                totalApproved: 123456
              },
              75: {
                federalActual: 23456,
                totalApproved: 234567
              },
              90: {
                federalActual: 3456,
                totalApproved: 34567
              }
            },
            mando: {
              50: {
                federalActual: 4567,
                totalApproved: 45678
              },
              75: {
                federalActual: 5678,
                totalApproved: 56789
              }
            }
          },
          2022: {
            ddi: {
              50: {
                federalActual: 6789,
                totalApproved: 678910
              },
              75: {
                federalActual: 78910,
                totalApproved: 78911
              },
              90: {
                federalActual: 78912,
                totalApproved: 78913
              }
            },
            mando: {
              50: {
                federalActual: 78914,
                totalApproved: 78915
              },
              75: {
                federalActual: 78916,
                totalApproved: 78917
              }
            }
          }
        }
      }
    }
  }
};

const setup = async (props = {}) => {
  let utils;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    utils = renderWithConnection(
      <MmisApdPreviousActivityTables {...defaultProps} {...props} />,
      { initialState }
    );
  });

  return utils;
};

describe('<MmisApdPreviousActivityTables />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup({}, { initialState: initialState });
    expect(screen.getByTestId('2021.ddi.50.federalActual')).toHaveValue(
      '1,234'
    );
    expect(screen.getByTestId('2021.ddi.50.totalApproved')).toHaveValue(
      '123,456'
    );
    expect(screen.getByTestId('2021.ddi.75.federalActual')).toHaveValue(
      '23,456'
    );
    expect(screen.getByTestId('2021.ddi.75.totalApproved')).toHaveValue(
      '234,567'
    );
    expect(screen.getByTestId('2021.ddi.90.federalActual')).toHaveValue(
      '3,456'
    );
    expect(screen.getByTestId('2021.ddi.90.totalApproved')).toHaveValue(
      '34,567'
    );

    expect(screen.getByTestId('2021.mando.50.federalActual')).toHaveValue(
      '4,567'
    );
    expect(screen.getByTestId('2021.mando.50.totalApproved')).toHaveValue(
      '45,678'
    );
    expect(screen.getByTestId('2021.mando.75.federalActual')).toHaveValue(
      '5,678'
    );
    expect(screen.getByTestId('2021.mando.75.totalApproved')).toHaveValue(
      '56,789'
    );

    expect(screen.getByTestId('2022.ddi.50.federalActual')).toHaveValue(
      '6,789'
    );
    expect(screen.getByTestId('2022.ddi.50.totalApproved')).toHaveValue(
      '678,910'
    );
    expect(screen.getByTestId('2022.ddi.75.federalActual')).toHaveValue(
      '78,910'
    );
    expect(screen.getByTestId('2022.ddi.75.totalApproved')).toHaveValue(
      '78,911'
    );
    expect(screen.getByTestId('2022.ddi.90.federalActual')).toHaveValue(
      '78,912'
    );
    expect(screen.getByTestId('2022.ddi.90.totalApproved')).toHaveValue(
      '78,913'
    );

    expect(screen.getByTestId('2022.mando.50.federalActual')).toHaveValue(
      '78,914'
    );
    expect(screen.getByTestId('2022.mando.50.totalApproved')).toHaveValue(
      '78,915'
    );
    expect(screen.getByTestId('2022.mando.75.federalActual')).toHaveValue(
      '78,916'
    );
    expect(screen.getByTestId('2022.mando.75.totalApproved')).toHaveValue(
      '78,917'
    );
  });

  test('handles changing expenses for ddi 50/50', async () => {
    await setup({}, { initialState: initialState });

    waitFor(() => {
      expect(
        screen
          .getByTestId('2021.ddi.50.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');

      waitFor(() => {
        expect(
          screen
            .getByTestId('2021.ddi.50.totalApproved')
            .innerHTML.replace('300,000')
        ).toHaveValue('300,000');
      });
    });
  });

  test('handles changing expenses for ddi 25/75', async () => {
    await setup({}, { initialState: initialState });

    waitFor(() => {
      expect(
        screen
          .getByTestId('2021.ddi.75.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');

      waitFor(() => {
        expect(
          screen
            .getByTestId('2021.ddi.75.totalApproved')
            .innerHTML.replace('300,000')
        ).toHaveValue('300,000');
      });
    });
  });

  test('handles changing expenses for ddi 10/90', async () => {
    await setup({}, { initialState: initialState });

    waitFor(() => {
      expect(
        screen
          .getByTestId('2021.ddi.90.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');

      waitFor(() => {
        expect(
          screen
            .getByTestId('2021.ddi.90.totalApproved')
            .innerHTML.replace('300,000')
        ).toHaveValue('300,000');
      });
    });
  });

  test('handles changing expenses for mmis 50/50', async () => {
    await setup({}, { initialState: initialState });

    waitFor(() => {
      expect(
        screen
          .getByTestId('2021.mmis.50.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');

      waitFor(() => {
        expect(
          screen
            .getByTestId('2021.mmis.50.totalApproved')
            .innerHTML.replace('300,000')
        ).toHaveValue('300,000');
      });
    });
  });

  test('handles changing expenses for mmis 25/75', async () => {
    await setup({}, { initialState: initialState });

    waitFor(() => {
      expect(
        screen
          .getByTestId('2021.mmis.75.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');

      waitFor(() => {
        expect(
          screen
            .getByTestId('2021.mmis.75.totalApproved')
            .innerHTML.replace('300,000')
        ).toHaveValue('300,000');
      });
    });
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                1: {
                  ddi: {
                    some: 'junk'
                  },
                  mando: {
                    the: 'good stuff'
                  }
                },
                2: {
                  ddi: {
                    more: 'garbage'
                  },
                  mando: {
                    finders: 'keepers'
                  }
                }
              }
            }
          }
        }
      })
    ).toEqual({
      previousActivityExpenses: {
        1: { ddi: { some: 'junk' }, mando: { the: 'good stuff' } },
        2: { ddi: { more: 'garbage' }, mando: { finders: 'keepers' } }
      }
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setActual: setPreviousActivityFederalActualExpense,
      setApproved: setPreviousActivityApprovedExpense
    });
  });
});
