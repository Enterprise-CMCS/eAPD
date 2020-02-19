import { shallow } from 'enzyme';
import React from 'react';

import {
  CostAllocateFFPRaw as CostAllocateFFP,
  makeMapStateToProps,
  mapDispatchToProps
} from './CostAllocateFFP';
import {
  setCostAllocationFFPFundingSplit,
  setCostAllocationFFPOtherFunding
} from '../../actions/editActivity';

describe('the CostAllocateFFP component', () => {
  const state = {
    apd: {
      data: {
        activities: [
          {
            costAllocation: {
              '1066': {
                other: 10,
                ffp: {
                  federal: 90,
                  state: 10
                }
              },
              '1067': {
                other: 0,
                ffp: {
                  federal: 10,
                  state: 90
                }
              }
            }
          }
        ]
      }
    },
    budget: {
      activities: {
        key: {
          costsByFFY: {
            '1066': {
              medicaidShare: 1550,
              federal: 1430,
              state: 120,
              total: 1970
            },
            '1067': {
              medicaidShare: 8870,
              federal: 8770,
              state: 100,
              total: 9889
            }
          }
        }
      }
    }
  };

  const props = {
    activityIndex: 0,
    byYearData: [
      {
        allocations: {
          federal: 261,
          state: 29
        },
        ffpSelectVal: '90-10',
        total: 300,
        medicaidShare: 290,
        year: '1066'
      },
      {
        allocations: {
          federal: 300,
          state: 2700
        },
        ffpSelectVal: '10-90',
        total: 3000,
        medicaidShare: 3000,
        year: '1067'
      }
    ],
    costAllocation: state.apd.data.activities[0].costAllocation,
    setFundingSplit: jest.fn(),
    setOtherFunding: jest.fn()
  };

  beforeEach(() => {
    props.setFundingSplit.mockClear();
    props.setOtherFunding.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('handles changes to other funding', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('DollarField')
      .filterWhere(n => n.props().value === 10)
      .simulate('change', { target: { value: 150 } });

    expect(props.setOtherFunding).toHaveBeenCalledWith(0, '1066', 150);
  });

  test('handles changes to cost allocation dropdown', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('Dropdown')
      .filterWhere(n => n.props().value === '90-10')
      .simulate('change', { target: { value: '35-65' } });

    expect(props.setFundingSplit).toHaveBeenCalledWith(0, '1066', 35, 65);
  });

  test('maps redux state to component props', () => {
    const mapStateToProps = makeMapStateToProps();
    expect(mapStateToProps(state, { activityIndex: 0, aKey: 'key' })).toEqual({
      byYearData: [
        {
          allocations: {
            federal: 1430,
            state: 120
          },
          ffpSelectVal: '90-10',
          total: 1970,
          medicaidShare: 1550,
          year: '1066'
        },
        {
          allocations: {
            federal: 8770,
            state: 100
          },
          ffpSelectVal: '10-90',
          total: 9889,
          medicaidShare: 8870,
          year: '1067'
        }
      ],
      costAllocation: state.apd.data.activities[0].costAllocation
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setFundingSplit: setCostAllocationFFPFundingSplit,
      setOtherFunding: setCostAllocationFFPOtherFunding
    });
  });
});
