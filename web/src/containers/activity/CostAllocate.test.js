import { shallow } from 'enzyme';
import React from 'react';

import {
  CostAllocateRaw as CostAllocate,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocate';
import { setCostAllocationMethodology, setCostAllocationOtherFunding } from '../../actions/editActivity/costAllocate';

describe('the CostAllocate component', () => {
  const props = {
    activityIndex: 1,
    activity: {
      key: 'activity key',
      costAllocationDesc: 'cost allocation',
      otherFundingDesc: 'other funding'
    },
    years: ['1066', '1067'],
    setMethodology: jest.fn(),
    setOtherFunding: jest.fn()
  };

  beforeEach(() => {
    props.setMethodology.mockClear(),
    props.setOtherFunding.mockClear()
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocate {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('updates activity when text is changed', () => {
    const component = shallow(<CostAllocate {...props} />);
    const mockedEvent = 

    component
      .find('RichText')
      .filterWhere(n => n.props().content === 'cost allocation')
      .prop('onSync')('bloop');
    expect(props.setMethodology).toHaveBeenCalledWith(1, 'bloop');

    component
      .find('RichText')
      .filterWhere(n => n.props().content === 'other funding')
      .prop('onSync')('florp');
    expect(props.setOtherFunding).toHaveBeenCalledWith(1, 'florp');
  });

  test('maps redux state to component props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              key: 'activity key'
            }
          ]
        }
      }
    };
    expect(mapStateToProps(state, {activityIndex: 0})).toEqual({
        activity: {
          key: 'activity key'
        }
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setMethodology: setCostAllocationMethodology,
      setOtherFunding: setCostAllocationOtherFunding
    });
  });
});
