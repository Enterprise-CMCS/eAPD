import React from 'react';
import {
  renderWithConnection,
  screen,
  act,
  waitFor
} from 'apd-testing-library';

import HitechApdPreviousActivityTables, {
  mapStateToProps,
  mapDispatchToProps
} from './HitechApdPreviousActivityTables';

import {
  setPreviousActivityFederalActualExpense,
  setPreviousActivityApprovedExpense,
  setPreviousActivityFederalActualExpenseForHITandHIE,
  setPreviousActivityApprovedExpenseForHITandHIE
} from '../../../redux/actions/editApd';

const defaultProps = {
  previousActivityExpenses: {
    2019: {
      hithie: {
        federalActual: 140000,
        totalApproved: 280000
      },
      mmis: {
        50: {
          federalActual: 23445,
          totalApproved: 82545
        },
        75: {
          federalActual: 23440,
          totalApproved: 75340
        },
        90: {
          federalActual: 235720,
          totalApproved: 262460
        }
      }
    },
    2000: {
      hithie: {
        federalActual: 146346,
        totalApproved: 234526
      },
      mmis: {
        50: {
          federalActual: 129387,
          totalApproved: 375445
        },
        75: {
          federalActual: 413246,
          totalApproved: 654455
        },
        90: {
          federalActual: 614544,
          totalApproved: 863455
        }
      }
    }
  },
  setActualMmis: jest.fn(),
  setApprovedMmis: jest.fn(),
  setActualHitech: jest.fn(),
  setApprovedHitech: jest.fn()
};

const initialState = {
  apd: {
    data: {
      previousActivities: {
        actualExpenditures: {
          2019: {
            hithie: {
              federalActual: 140000,
              totalApproved: 280000
            },
            mmis: {
              50: {
                federalActual: 23445,
                totalApproved: 82545
              },
              75: {
                federalActual: 23440,
                totalApproved: 75340
              },
              90: {
                federalActual: 235720,
                totalApproved: 262460
              }
            }
          },
          2000: {
            hithie: {
              federalActual: 146346,
              totalApproved: 234526
            },
            mmis: {
              50: {
                federalActual: 129387,
                totalApproved: 375445
              },
              75: {
                federalActual: 413246,
                totalApproved: 654455
              },
              90: {
                federalActual: 614544,
                totalApproved: 863455
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
      <HitechApdPreviousActivityTables {...defaultProps} {...props} />,
      {
        initialState
      }
    );
  });

  return utils;
};

describe('<HitechApdPreviousActivityTables />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly', async () => {
    await setup({}, { initialState: initialState });
    expect(screen.getByTestId('2019.hithie.federalActual')).toHaveValue(
      '140,000'
    );
    expect(screen.getByTestId('2019.hithie.totalApproved')).toHaveValue(
      '280,000'
    );
    expect(screen.getByTestId('2019.mmis.50.federalActual')).toHaveValue(
      '23,445'
    );
    expect(screen.getByTestId('2019.mmis.50.totalApproved')).toHaveValue(
      '82,545'
    );
    expect(screen.getByTestId('2019.mmis.75.federalActual')).toHaveValue(
      '23,440'
    );
    expect(screen.getByTestId('2019.mmis.75.totalApproved')).toHaveValue(
      '75,340'
    );
    expect(screen.getByTestId('2019.mmis.90.federalActual')).toHaveValue(
      '235,720'
    );
    expect(screen.getByTestId('2019.mmis.90.totalApproved')).toHaveValue(
      '262,460'
    );
    expect(screen.getByTestId('2000.hithie.federalActual')).toHaveValue(
      '146,346'
    );
    expect(screen.getByTestId('2000.hithie.totalApproved')).toHaveValue(
      '234,526'
    );
    expect(screen.getByTestId('2000.mmis.50.federalActual')).toHaveValue(
      '129,387'
    );
    expect(screen.getByTestId('2000.mmis.50.totalApproved')).toHaveValue(
      '375,445'
    );
    expect(screen.getByTestId('2000.mmis.75.federalActual')).toHaveValue(
      '413,246'
    );
    expect(screen.getByTestId('2000.mmis.75.totalApproved')).toHaveValue(
      '654,455'
    );
    expect(screen.getByTestId('2000.mmis.90.federalActual')).toHaveValue(
      '614,544'
    );
    expect(screen.getByTestId('2000.mmis.90.totalApproved')).toHaveValue(
      '863,455'
    );
  });

  test('handles changing expenses for hitech', async () => {
    await setup({}, { initialState: initialState });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.hithie.totalApproved')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.hithie.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
  });

  test('handles changing expenses for mmis 50/50', async () => {
    await setup({}, { initialState: initialState });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.50.totalApproved')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.50.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
  });

  test('handles changing expenses for mmis 25/75', async () => {
    await setup({}, { initialState: initialState });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.75.totalApproved')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.75.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
  });

  test('handles changing expenses for mmis 10/90', async () => {
    await setup({}, { initialState: initialState });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.90.totalApproved')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
    });
    // eslint-disable-next-line await-async-utils
    waitFor(() => {
      expect(
        screen
          .getByTestId('2019.mmis.90.federalActual')
          .innerHTML.replace('300,000')
      ).toHaveValue('300,000');
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
                  hithie: {
                    some: 'junk'
                  },
                  mmis: {
                    the: 'good stuff'
                  }
                },
                2: {
                  hithie: {
                    more: 'garbage'
                  },
                  mmis: {
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
        1: {
          hithie: {
            some: 'junk'
          },
          mmis: {
            the: 'good stuff'
          }
        },
        2: {
          hithie: {
            more: 'garbage'
          },
          mmis: {
            finders: 'keepers'
          }
        }
      }
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setActualMmis: setPreviousActivityFederalActualExpense,
      setApprovedMmis: setPreviousActivityApprovedExpense,
      setActualHitech: setPreviousActivityFederalActualExpenseForHITandHIE,
      setApprovedHitech: setPreviousActivityApprovedExpenseForHITandHIE
    });
  });
});
