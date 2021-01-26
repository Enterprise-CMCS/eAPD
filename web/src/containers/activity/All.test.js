import { shallow } from 'enzyme';
import React from 'react';

import { addActivity } from '../../actions/editActivity';

import {
  plain as Activities,
  mapStateToProps,
  mapDispatchToProps
} from './All';

const initialProps = {
  addActivity: () => {},
  activities: [
    { key: 'key1', first: 'activity' },
    { key: 'key2', second: 'activity' },
    { key: 'key3', third: 'activity' }
  ]
};

const setup = props => shallow(<Activities {...initialProps} {...props} />);

describe('the Activities component', () => {
  it('renders correctly', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it('calls addActivity when the button component is clicked', () => {
    const mockAddActivity = jest.fn();
    const component = setup({ addActivity: mockAddActivity });
    expect(mockAddActivity).not.toHaveBeenCalled();
    component.find('Button').simulate('click');
    expect(mockAddActivity).toHaveBeenCalled();
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [{ key: 'key1' }, { key: 'key2' }, { key: 'key3' }]
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: [{ key: 'key1' }, { key: 'key2' }, { key: 'key3' }]
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      addActivity
    });
  });
});
