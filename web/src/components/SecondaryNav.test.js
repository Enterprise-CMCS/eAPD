import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as SecondaryNav,
  mapStateToProps,
  mapDispatchToProps
} from './SecondaryNav';
import { addActivity } from '../actions/editActivity';
import { jumpTo } from '../actions/app';

global.scrollTo = jest.fn();

describe('Secondary Nav component', () => {
  const props = {
    activities: [{ anchor: 'activity-1' }, { anchor: 'activity-2' }],
    activityCount: 2,
    add: jest.fn(),
    jumpTo: jest.fn()
  };

  beforeEach(() => {
    props.add.mockClear();
    props.jumpTo.mockClear();
  });

  it('renders without add activity button when not on the last activity', () => {
    expect(
      shallow(<SecondaryNav {...props} activeSection="activity-1-ffp" />).dive()
    ).toMatchSnapshot();
  });

  it('renders without add activity button when on the last activity but not on the FFP section', () => {
    expect(
      shallow(
        <SecondaryNav {...props} activeSection="activity-2-something-else" />
      ).dive()
    ).toMatchSnapshot();
  });

  it('renders with add activity button when on the last activity on the FFP section', () => {
    expect(
      shallow(<SecondaryNav {...props} activeSection="activity-2-ffp" />).dive()
    ).toMatchSnapshot();
  });

  it('handles add activity button click', () => {
    const component = shallow(
      <SecondaryNav {...props} activeSection="activity-2-ffp" />
    ).dive();
    const link = component.find('.ds-c-button');
    expect(link.props().to).toBe('/apd/activities');

    link.simulate('click');

    expect(props.add).toHaveBeenCalled();
    expect(props.jumpTo).toHaveBeenCalledWith('activities-list');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            { name: 'activity', key: '1' },
            { name: 'activity', key: '2' }
          ]
        }
      },
      navigation: { activeSection: 'activity-2-ffp' }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: [
        { anchor: 'activity-1', name: 'activity', key: '1' },
        { anchor: 'activity-2', name: 'activity', key: '2' }
      ],
      activeSection: 'activity-2-ffp',
      activityCount: 2
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      add: addActivity,
      jumpTo
    });
  });
});
