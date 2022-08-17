import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';

const quarterlyFFP = {
  2022: {
    1: {
      combined: {
        dollars: 753714,
        percent: 0
      },
      contractors: {
        dollars: 290757,
        percent: 0.25
      },
      inHouse: {
        dollars: 462957,
        percent: 0.25
      }
    },
    2: {
      combined: {
        dollars: 753712,
        percent: 0
      },
      contractors: {
        dollars: 290757,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    3: {
      combined: {
        dollars: 753711,
        percent: 0
      },
      contractors: {
        dollars: 290756,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    4: {
      combined: {
        dollars: 753711,
        percent: 0
      },
      contractors: {
        dollars: 290756,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    subtotal: {
      combined: {
        dollars: 3014848,
        percent: 0
      },
      contractors: {
        dollars: 1163026,
        percent: 1
      },
      inHouse: {
        dollars: 1851822,
        percent: 1
      }
    }
  }
};

const quarterlyFFPWithErrors = {
  2022: {
    1: {
      combined: {
        dollars: 753714,
        percent: 0
      },
      contractors: {
        dollars: 290757,
        percent: 0.5
      },
      inHouse: {
        dollars: 462957,
        percent: 0.5
      }
    },
    2: {
      combined: {
        dollars: 753712,
        percent: 0
      },
      contractors: {
        dollars: 290757,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    3: {
      combined: {
        dollars: 753711,
        percent: 0
      },
      contractors: {
        dollars: 290756,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    4: {
      combined: {
        dollars: 753711,
        percent: 0
      },
      contractors: {
        dollars: 290756,
        percent: 0.25
      },
      inHouse: {
        dollars: 462955,
        percent: 0.25
      }
    },
    subtotal: {
      combined: {
        dollars: 3014848,
        percent: 0
      },
      contractors: {
        dollars: 1163026,
        percent: 1.25
      },
      inHouse: {
        dollars: 1851822,
        percent: 1.25
      }
    }
  }
};

const defaultProps = {
  activityIndex: 0,
  aKey: '6ea6b4a2',
  announce: jest.fn(),
  isViewOnly: false,
  setContractorFFP: jest.fn(),
  setInHouseFFP: jest.fn(),
  year: '2022'
};

const setup = async (props = {}, options = {}) => {
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <CostAllocateFFPQuarterly {...defaultProps} {...props} />,
      options
    );
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('the cost allocation quarterly FFP component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('gracefully falls back if the quarterly FFP is not ready', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: null
              }
            }
          }
        }
      }
    );

    expect(screen.queryByText(`FFY ${defaultProps.year}`)).toBeNull();
  });

  it('renders table header of correct year', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    expect(screen.getByText(`FFY ${defaultProps.year}`)).toBeInTheDocument();
  });

  it('shows error messages with invalid percentages', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: true
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFPWithErrors
              }
            }
          }
        }
      }
    );

    expect(
      screen.getByRole('alert', {
        name: 'Error message for Estimated Quarterly Expenditure table'
      })
    ).toHaveTextContent(
      'State Staff and Expenses (In-House Costs) quarterly percentages must total 100% Private Contractor Costs quarterly percentages must total 100%'
    );
  });

  it('renders table role correctly', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    expect(
      screen.getByRole('table', {
        name: `Enter the federal fiscal year ${defaultProps.year} quarterly breakdown by percentage.`
      })
    ).toBeInTheDocument();
  });

  it('renders subtotals percent', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    expect(
      screen.getAllByRole('cell', {
        name: `+100%`
      })
    ).toHaveLength(2);
  });

  it('renders state staff and expenses subtotal', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    expect(
      screen.getByRole('cell', {
        name: `$1,851,822`
      })
    ).toBeInTheDocument();
  });

  it('renders private contractor costs subtotal', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    expect(
      screen.getByRole('cell', {
        name: `$1,163,026`
      })
    ).toBeInTheDocument();
  });

  // Todo: Revisit this. It seems that the component is trying
  // to call deeply nested functions. Unsure what a workaround
  // would be. Perhaps the component should be refactored.
  xit('handles changes to in-house quarterly FFP', async () => {
    const { user } = await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              years: ['2022']
            },
            adminCheck: false
          },
          budget: {
            activities: {
              '6ea6b4a2': {
                quarterlyFFP: quarterlyFFP
              }
            }
          }
        }
      }
    );

    await waitFor(() => {
      user.clear(
        screen.getByRole('textbox', {
          name: 'federal share for ffy 2022, quarter 1, state'
        })
      );
      user.type(
        screen.getByRole('textbox', {
          name: 'federal share for ffy 2022, quarter 1, state'
        }),
        '5'
      );
    });

    expect(
      screen.getByRole('textbox', {
        name: 'federal share for ffy 2022, quarter 1, state'
      })
    ).toHaveValue('5');
  });
});
