import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as CostAllocate,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocate';
import { setCostAllocationMethodology } from '../../../actions/editActivity/costAllocate';

describe('<CostAllocate />', () => {
  const props = {
    activityIndex: 1,
    activity: {
      key: 'activity key',
      costAllocationNarrative: {
        methodology: 'cost allocation',
        otherSources: 'other funding'
      }
    },
    setMethodology: jest.fn()
  };

  beforeEach(() => {
    props.setMethodology.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<CostAllocate {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('updates activity when text is changed', () => {
    const component = shallow(<CostAllocate {...props} />);

    component
      .find('Connect(RichText)')
      .filterWhere(n => n.props().content === 'cost allocation')
      .prop('onSync')('bloop');
    expect(props.setMethodology).toHaveBeenCalledWith(1, 'bloop');
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
    expect(mapStateToProps(state, { activityIndex: 0 })).toEqual({
      activity: {
        key: 'activity key'
      }
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setMethodology: setCostAllocationMethodology
    });
  });
});
