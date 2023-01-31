import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import CostAllocatedFFP from './CostAllocateFFP';

const defaultProps = {
  activityIndex: 0
};

const initialState = {
  apd: {
    data: {
      years: ['2022'],
      activities: [
        {
          costAllocation: {
            2022: {
              ffp: {
                federal: 0,
                state: 100
              },
              other: 105000
            }
          },
          quarterlyFFP: {
            2022: {
              1: {
                combined: 25,
                contractors: 1,
                inHouse: 125
              },
              2: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              },
              3: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              },
              4: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              }
            },
            2023: {
              1: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              },
              2: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              },
              3: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              },
              4: {
                combined: 25,
                contractors: 25,
                inHouse: 25
              }
            }
          },
          contractorResources: [],
          expenses: [],
          statePersonnel: [],
          key: 'key123',
          activityId: 'key123'
        }
      ],
      keyStatePersonnel: {
        medicaidDirector: {},
        keyPersonnel: []
      }
    },
    adminCheck: false
  },
  budget: {
    activityTotals: [
      {
        id: 'abc',
        fundingSource: 'HIT',
        data: {}
      }
    ],
    activities: {
      key123: {
        costsByFFY: {
          2022: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 300
          },
          total: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 300
          }
        },
        quarterlyFFP: {
          years: {
            2022: {
              1: {
                combined: {
                  dollars: 1938674,
                  percent: 0
                },
                contractors: {
                  dollars: 9692,
                  percent: 0.01
                },
                inHouse: {
                  dollars: 1928982,
                  percent: 1.25
                }
              },
              2: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              3: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              4: {
                combined: {
                  dollars: 628093,
                  percent: 0
                },
                contractors: {
                  dollars: 242297,
                  percent: 0.25
                },
                inHouse: {
                  dollars: 385796,
                  percent: 0.25
                }
              },
              subtotal: {
                combined: {
                  dollars: 2512373,
                  percent: 0
                },
                contractors: {
                  dollars: 969188,
                  percent: 0.76
                },
                inHouse: {
                  dollars: 1543185,
                  percent: 2
                }
              }
            }
          },
          total: {
            combined: 4316194,
            contractors: 1457388,
            inHouse: 2858806
          }
        }
      }
    }
  }
};

const initialStateWithAdminCheck = {
  ...initialState,
  apd: {
    ...initialState.apd,
    adminCheck: {
      enabled: true
    }
  }
};

const setup = async (props = {}, options = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <CostAllocatedFFP {...defaultProps} {...props} />,
      options
    );
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('the CostAllocateFFP component', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders tbale correctly', async () => {
    await setup(
      {},
      {
        initialState: initialState
      }
    );

    const table = screen.getByRole('table', {
      name: `Activity 1 Budget for FFY ${initialState.apd.data.years[0]}`
    });
    expect(table).toMatchSnapshot();
  });

  it('renders page title', async () => {
    await setup(
      {},
      {
        initialState: initialState
      }
    );
    expect(
      screen.getByRole('heading', { name: 'Budget and FFP' })
    ).toBeInTheDocument();
  });

  it('renders table title', async () => {
    await setup(
      {},
      {
        initialState: initialState
      }
    );
    expect(
      screen.getByRole('table', {
        name: `Activity 1 Budget for FFY ${initialState.apd.data.years[0]}`
      })
    ).toBeInTheDocument();
  });

  it('renders correct number of options in fed-state split dropdown', async () => {
    await setup(
      {},
      {
        initialState: initialStateWithAdminCheck
      }
    );
    expect(screen.getAllByRole('option').length).toBe(4);
  });

  it('handles changes to the fed-state split', async () => {
    const { user } = await setup(
      {},
      {
        initialState: initialStateWithAdminCheck
      }
    );

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '90-10' })
    );

    expect(screen.getByRole('option', { name: '90-10' }).selected).toBe(true);

    const dropdown = screen.getByRole('combobox');

    await waitFor(() => {
      dropdown.blur();
    });

    const error = screen.queryByText('Select a federal-state split.');
    expect(error).not.toBeInTheDocument();
  });

  it('renders error when no federal-state split is selected', async () => {
    const { user } = await setup(
      {},
      {
        initialState: initialStateWithAdminCheck
      }
    );

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Select an option' })
    );

    expect(
      screen.getByRole('option', { name: 'Select an option' }).selected
    ).toBe(true);

    const dropdown = screen.getByRole('combobox');

    await waitFor(() => {
      dropdown.blur();
    });

    const error = await screen.findByText('Select a federal-state split.');
    expect(error).toBeInTheDocument();
  });
});
