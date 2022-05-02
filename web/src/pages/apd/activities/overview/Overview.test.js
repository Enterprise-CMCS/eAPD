import { shallow } from 'enzyme';
import React from 'react';

import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from '../../../../redux/actions/editActivity';

import {
  plain as ActivityOverview,
  mapStateToProps,
  mapDispatchToProps
} from './Overview';

describe('activity overview/summary section (in the activity body)', () => {
  const props = {
    activity: {},
    activityIndex: 37,
    setAlternatives: jest.fn(),
    setDescription: jest.fn(),
    setOverview: jest.fn()
  };

  beforeEach(() => {
    props.setAlternatives.mockClear();
    props.setDescription.mockClear();
    props.setOverview.mockClear();
  });

  it('renders correctly', () => {
    expect(shallow(<ActivityOverview {...props} />)).toMatchSnapshot();
  });

  it('handles changing the activity overview/summary', () => {
    const component = shallow(<ActivityOverview {...props} />);
    component
      .find('Connect(RichText)')
      .at(0) // makes an assumption about what order these components appear in
      .prop('onSync')('new overview');

    expect(props.setOverview).toHaveBeenCalledWith(37, 'new overview');
  });

  it('handles changing the activity description', () => {
    const component = shallow(<ActivityOverview {...props} />);
    component
      .find('Connect(RichText)')
      .at(1) // makes an assumption about what order these components appear in
      .prop('onSync')('new description');

    expect(props.setDescription).toHaveBeenCalledWith(37, 'new description');
  });

  it('handles changing the activity statement of alternatives', () => {
    const component = shallow(<ActivityOverview {...props} />);
    component
      .find('Connect(RichText)')
      .at(2) // makes an assumption about what order these components appear in
      .prop('onSync')('new alternatives');

    expect(props.setAlternatives).toHaveBeenCalledWith(37, 'new alternatives');
  });

  it('maps state to props', () => {
    const state = {
      apd: { data: { activities: ['activity 1', 'activity 2'] } }
    };
    expect(mapStateToProps(state, { activityIndex: 1 })).toEqual({
      activity: 'activity 2'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setAlternatives: setActivityAlternatives,
      setDescription: setActivityDescription,
      setOverview: setActivityOverview
    });
  });
});
