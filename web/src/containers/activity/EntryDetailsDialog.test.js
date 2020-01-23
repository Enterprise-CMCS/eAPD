import { shallow } from 'enzyme';
import React from 'react';

import ActivityDialog from './EntryDetailsDialog';

describe('the Activity Dialog component', () => {
  const props = {
    title: 'activity name',
    activityIndex: 2,
    closeModal: jest.fn()
  };

  test('renders correctly', () => {
    const component = shallow(<ActivityDialog {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('it calls closeModal when exiting', () => {
    const component = shallow(<ActivityDialog {...props} />);
    const button = component.dive().find('Button');
    button.simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
});
