import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { APD_TYPE } from '@cms-eapd/common';
import { useForm, FormProvider } from 'react-hook-form';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

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
                state: 100,
                fundingCategory: null
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
  /* eslint react/prop-types: 0 */
  const Wrapper = props => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{props.children}</FormProvider>;
  };

  /* eslint testing-library/no-unnecessary-act: 0 */
  await act(async () => {
    renderWithConnection(
      <Wrapper>
        <CostAllocatedFFP {...defaultProps} {...props} />
      </Wrapper>,
      options
    );
  });
  const user = userEvent.setup();
  return {
    user
  };
};

describe('the CostAllocateFFP component', () => {
  jest.setTimeout(30000);
  beforeEach(() => {
    jest.resetAllMocks();
    // reset before each test case
    resetLDMocks();
    mockFlags({ emptyBudgetWording: false });
  });

  it('renders table correctly', async () => {
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

  it('renders correct number of options in fed-state split dropdown for HITECH', async () => {
    await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.HITECH
            }
          }
        }
      }
    );
    expect(screen.getAllByRole('option').length).toBe(4);
  });

  it('handles changes to the fed-state split for HITECH', async () => {
    const { user } = await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.HITECH
            },
            adminCheck: {
              enabled: true
            }
          }
        }
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

    expect(screen.queryByText('Select a federal-state split.')).toBeNull();
  });

  it('renders error when no federal-state split is selected for HITECH', async () => {
    const { user } = await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.HITECH
            }
          },
          adminCheck: {
            enabled: true
          }
        }
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

    expect(
      // eslint-disable-next-line testing-library/prefer-presence-queries
      screen.queryByText('Select a federal-state split.')
    ).toBeInTheDocument();
  });

  it('renders correct options in the match rate radio group for MMIS', async () => {
    await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.MMIS
            }
          }
        }
      }
    );
    expect(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '75/25' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '50/50' })).toBeInTheDocument();

    expect(
      screen.queryAllByRole('radio', {
        name: 'Design, Development, and Installation (DDI)'
      })
    ).toHaveLength(0);
    expect(
      screen.queryAllByRole('radio', {
        name: 'Maintenance & Operations (M&O)'
      })
    ).toHaveLength(0);
  });

  it('handles changes to the match rate for MMIS', async () => {
    const { user } = await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.MMIS
            }
          }
        }
      }
    );

    user.click(
      screen.getByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole('radio', {
          name: '90/10 Design, Development, and Installation (DDI)'
        })
      ).toBeChecked();
    });
  });

  it('renders error when no match is selected for MMIS', async () => {
    await setup(
      {},
      {
        initialState: {
          ...initialStateWithAdminCheck,
          apd: {
            ...initialStateWithAdminCheck.apd,
            data: {
              ...initialStateWithAdminCheck.apd.data,
              apdType: APD_TYPE.MMIS
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );

    expect(
      await screen.findAllByText('Select a federal-state split.')
    ).toHaveLength(2);
  });
});
