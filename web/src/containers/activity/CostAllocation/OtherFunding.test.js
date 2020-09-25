import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as OtherFunding,
  mapDispatchToProps
} from './OtherFunding';
import {
  setCostAllocationFFPOtherFunding,
  setCostAllocationOtherFunding
} from '../../../actions/editActivity';

describe('<OtherFunding />', () => {
  const props = {
    activityIndex: 1,
    activity: {
      key: 'activity key',
      costAllocationNarrative: {
        methodology: 'cost allocation',
        '1066': { otherSources: 'other funding for FFY 1066' },
        '1067': { otherSources: 'other funding for FFY 1067' }
      }
    },
    costAllocation: {
      '1066': {
        other: 1235
      },
      '1067': {
        other: 1234
      }
    },
    costSummary: {
      years: {
        '1066': {
          totalCost: 5459076,
          otherFunding: 4322,
          medicaidShare: 3450509
        },
        '1067': {
          totalCost: 5459077,
          otherFunding: 4323,
          medicaidShare: 3450510
        }
      }
    },
    setOtherFunding: jest.fn()
  };

  beforeEach(() => {
    props.setOtherFunding.mockClear();
  });

  fit('renders correctly', () => {
    const component = shallow(<OtherFunding {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('updates activity when text is changed', () => {
    const component = shallow(<OtherFunding {...props} />);

    component
      .find('Connect(RichText)')
      .filterWhere(n => n.props().content === 'cost allocation')
      .prop('onSync')('bloop');
    expect(props.setMethodology).toHaveBeenCalledWith(1, 'bloop');

    component
      .find('Connect(RichText)')
      .filterWhere(n => n.props().content === 'other funding')
      .prop('onSync')('florp');
    expect(props.setOtherFunding).toHaveBeenCalledWith(1, 'florp');
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setOtherFunding: setCostAllocationFFPOtherFunding,
      syncOtherFunding: setCostAllocationOtherFunding
    });
  });
});
