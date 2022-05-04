import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as PreviousActivities,
  mapStateToProps,
  mapDispatchToProps
} from './PreviousActivities';

import { setPreviousActivitySummary } from '../../../redux/actions/editApd';

describe('previous activities component', () => {
  const props = {
    previousActivities: {
      previousActivitySummary: 'bob'
    },
    setSummary: jest.fn()
  };

  beforeEach(() => {
    props.setSummary.mockClear();
  });

  it('renders correctly', () => {
    const component = shallow(<PreviousActivities {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('updates on text change', () => {
    const component = shallow(<PreviousActivities {...props} />);
    component.find('Connect(RichText)').prop('onSync')('this is html');

    expect(props.setSummary).toHaveBeenCalledWith('this is html');
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: { previousActivities: { previousActivitySummary: 'summary' } }
        }
      })
    ).toEqual({ previousActivitySummary: 'summary' });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setSummary: setPreviousActivitySummary
    });
  });
});
