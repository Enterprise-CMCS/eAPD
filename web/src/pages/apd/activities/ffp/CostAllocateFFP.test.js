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
          key: 'key123'
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
            federal: 2512373,
            medicaidShare: 3349831,
            state: 837458,
            total: 3454831
          },
          total: {
            federal: 4316194,
            medicaidShare: 5354076,
            state: 1037882,
            total: 5459076
          }
        },
        quarterlyFFP: {
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
    adminCheck: true
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
  beforeEach(() => {
    jest.resetAllMocks();
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

  //
  //   it('handles updating federal-state split dropdown', async () => {
  //     const { user } = await setup(
  //       {},
  //       {
  //         initialState: initialStateWithAdminCheck
  //       }
  //     );
  //
  //     const dropdown = screen.getByRole('combobox', {
  //       name: 'federal-state split'
  //     });
  //     // expect(dropdown.value).to.equal('0-100');
  //     user.change(dropdown, { target: { value: '75-25' } });
  //     expect(
  //       screen.getByText('Select a federal-state split.')
  //     ).not.toBeInTheDocument();
  //   });

  // it('renders as expected in editable mode(standard)', async () => {
  //   await setup(
  //     {},
  //     {
  //       initialState: initialState
  //     }
  //   );
  // });

  //   describe('renders correctly', () => {
  //     it('renders correctly in view-only mode', () => {
  //       const component = shallow(<CostAllocateFFP {...props} isViewOnly />);
  //       expect(component).toMatchSnapshot();
  //     });
  //     it('renders correctly in editable mode (standard)', () => {
  //       const component = shallow(<CostAllocateFFP {...props} />);
  //       expect(component).toMatchSnapshot();
  //     });
  //   });
  //
  //   xit('handles changes to cost allocation dropdown', () => {
  //     const component = shallow(<CostAllocateFFP {...props} />);
  //     component
  //       .find('Dropdown')
  //       .at(1)
  //       .simulate('change', { target: { value: '35-65' } });
  //
  //     expect(props.setFundingSplit).toHaveBeenCalledWith(0, '1991', 35, 65);
  //   });
  //
  //   it('renders the budget and cost allocation summary narrative', () => {
  //     const costAllocation = {
  //       1: { ffp: { federal: 'f', state: 's' } },
  //       2: { ffp: { federal: 'f', state: 's' } },
  //       3: { ffp: { federal: 'f', state: 's' } }
  //     };
  //
  //     const p = {
  //       activityName: 'activity',
  //       costAllocation,
  //       costSummary: {
  //         total: {
  //           federalShare: 1,
  //           medicaidShare: 2,
  //           otherFunding: 3,
  //           stateShare: 4,
  //           totalCost: 5
  //         }
  //       },
  //       stateName: 'the state'
  //     };
  //
  //     expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();
  //
  //     costAllocation['2'].ffp.federal = 'ff';
  //     expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();
  //
  //     costAllocation['2'].ffp.federal = 'f';
  //     costAllocation['3'].ffp.federal = 'ff';
  //     expect(shallow(<AllFFYsSummaryNarrative {...p} />)).toMatchSnapshot();
  //   });
  //
  //   it('maps redux state to component props', () => {
  //     const getActivity = jest.fn();
  //     getActivity.mockReturnValue({ key: 'activity key', name: 'activity name' });
  //
  //     const getCostAllocation = jest.fn();
  //     getCostAllocation.mockReturnValue('cost allocation');
  //
  //     const getCostSummary = jest.fn();
  //     getCostSummary.mockReturnValue('cost summary');
  //
  //     const getState = jest.fn();
  //     getState.mockReturnValue({ name: 'denial' });
  //
  //     const getActivityTotal = jest.fn();
  //     getActivityTotal.mockReturnValue({
  //       data: {
  //         otherFunding: {
  //           2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
  //           2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
  //         }
  //       }
  //     });
  //
  //     expect(
  //       mapStateToProps(
  //         { apd: { adminCheck: true } },
  //         { activityIndex: 0 },
  //         {
  //           getActivity,
  //           getCostAllocation,
  //           getCostSummary,
  //           getState,
  //           getActivityTotal
  //         }
  //       )
  //     ).toEqual({
  //       aKey: 'activity key',
  //       activityName: 'activity name',
  //       costAllocation: 'cost allocation',
  //       costSummary: 'cost summary',
  //       otherFunding: {
  //         2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
  //         2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
  //       },
  //       stateName: 'denial',
  //       adminCheck: true
  //     });
  //
  //     expect(getActivity).toHaveBeenCalledWith(
  //       { apd: { adminCheck: true } },
  //       {
  //         activityIndex: 0
  //       }
  //     );
  //     expect(getCostAllocation).toHaveBeenCalledWith(
  //       { apd: { adminCheck: true } },
  //       {
  //         activityIndex: 0
  //       }
  //     );
  //     expect(getCostSummary).toHaveBeenCalledWith(
  //       { apd: { adminCheck: true } },
  //       {
  //         activityIndex: 0
  //       }
  //     );
  //     expect(getState).toHaveBeenCalledWith({ apd: { adminCheck: true } });
  //
  //     // Now test that it builds a default activity name if none is provided
  //     getActivity.mockReturnValue({ key: 'activity key', name: '' });
  //
  //     expect(
  //       mapStateToProps(
  //         { apd: { adminCheck: true } },
  //         { activityIndex: 0, adminCheck: true },
  //         {
  //           getActivity,
  //           getCostAllocation,
  //           getCostSummary,
  //           getState,
  //           getActivityTotal
  //         }
  //       )
  //     ).toEqual({
  //       aKey: 'activity key',
  //       activityName: 'Untitled',
  //       costAllocation: 'cost allocation',
  //       costSummary: 'cost summary',
  //       otherFunding: {
  //         2020: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
  //         2021: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
  //       },
  //       stateName: 'denial',
  //       adminCheck: true
  //     });
  //   });
  //
  //   it('maps dispatch actions to props', () => {
  //     expect(mapDispatchToProps).toEqual({
  //       setFundingSplit: setCostAllocationFFPFundingSplit
  //     });
  //   });
});
