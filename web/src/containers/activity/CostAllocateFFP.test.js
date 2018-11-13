import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import {
  CostAllocateFFPRaw as CostAllocateFFP,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocateFFP';
import { updateActivity } from '../../actions/activities';

describe('the CostAllocateFFP component', () => {
  const sandbox = sinon.createSandbox();

  const state = {
    activities: {
      byKey: {
        key: {
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
    aKey: 'activity key',
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
    costAllocation: state.activities.byKey.key.costAllocation,
    updateActivity: sandbox.stub()
  };

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('handles changes to other funding', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('InputHolder')
      .filterWhere(n => n.props().value === 10)
      .simulate('change', { target: { value: '150' } });

    expect(
      props.updateActivity.calledWith(
        'activity key',
        { costAllocation: { '1066': { other: 150 } } },
        true
      )
    );
  });

  test('handles changes to cost allocation dropdown', () => {
    const component = shallow(<CostAllocateFFP {...props} />);
    component
      .find('Select')
      .filterWhere(n => n.props().value === '90-10')
      .simulate('change', { target: { value: '35-65' } });

    expect(
      props.updateActivity.calledWith(
        'activity key',
        { costAllocation: { '1066': { ffp: { federal: 35, state: 65 } } } },
        true
      )
    );
  });

  test('maps redux state to component props', () => {
    expect(mapStateToProps(state, { aKey: 'key' })).toEqual({
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
      costAllocation: state.activities.byKey.key.costAllocation
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      updateActivity
    });
  });
});
