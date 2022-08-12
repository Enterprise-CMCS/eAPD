import React from 'react';
import { renderWithConnection, act, screen } from 'apd-testing-library';
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
    // jest.resetAllMocks();
  });

  it('renders as expected', async () => {
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

    expect(screen).toMatchSnapshot();
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

    expect(screen).toMatchSnapshot();
  });

  it.only('handles changes to in-house quarterly FFP', async () => {
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

    await user.clear(
      screen.getByRole('textbox', {
        name: 'federal share for ffy 2022, quarter 1, state'
      })
    );
    await user.type(
      screen.getByRole('textbox', {
        name: 'federal share for ffy 2022, quarter 1, state'
      }),
      '5'
    );

    expect(
      screen.getByRole('textbox', {
        name: 'federal share for ffy 2022, quarter 1, state'
      })
    ).toHaveValue('5');
    screen.debug();
    // expect(screen).toMatchSnapshot();
  });

  // it('gracefully falls back if the quarterly FFP is not ready', () => {
  //   expect(
  //     shallow(
  //       <CostAllocateFFPQuarterly
  //         activityIndex={3}
  //         aKey="activity key"
  //         announce={announce}
  //         isViewOnly={false}
  //         quarterlyFFP={null}
  //         setContractorFFP={setContractorFFP}
  //         setInHouseFFP={setInHouseFFP}
  //         year="13"
  //       />
  //     )
  //   ).toMatchSnapshot();
  // });
  //
  //   it('renders as expected', () => {
  //     expect(component).toMatchSnapshot();
  //   });
  //
  //   it('maps state to props', () => {
  //     const state = {
  //       apd: { data: { years } },
  //       budget: { activities: { 'activity key': { quarterlyFFP } } }
  //     };
  //
  //     const mapStateToProps = makeMapStateToProps();
  //     expect(mapStateToProps(state, { aKey: 'activity key' })).toEqual({
  //       quarterlyFFP,
  //       years
  //     });
  //   });
  //
  //   it('handles changes to in-house quarterly FFP', () => {
  //     // The first four are in-house for quarters 1-4; remember that these
  //     // are 0-indexed, so at(2) gives us the 3rd quarter input
  //     component
  //       .find('PercentField')
  //       .at(2)
  //       .simulate('change', { target: { value: 88 } });
  //
  //     expect(setInHouseFFP).toHaveBeenCalledWith(3, '13', 3, 88);
  //     expect(announce).toHaveBeenCalledWith('activity key', '13', 3, 'inHouse');
  //   });
  //
  //   it('handles changes to in-house quarterly FFP', () => {
  //     component
  //       .find('PercentField')
  //       .at(4)
  //       .simulate('change', { target: { value: 19 } });
  //
  //     expect(setContractorFFP).toHaveBeenCalledWith(3, '13', 1, 19);
  //     expect(announce).toHaveBeenCalledWith(
  //       'activity key',
  //       '13',
  //       1,
  //       'contractors'
  //     );
  //   });
  //
  //   it('maps dispatch actions to props', () => {
  //     expect(mapDispatchToProps).toEqual({
  //       announce: ariaAnnounceFFPQuarterly,
  //       setContractorFFP: setFFPForContractorCostsForFiscalQuarter,
  //       setInHouseFFP: setFFPForInHouseCostsForFiscalQuarter
  //     });
  //   });
});
