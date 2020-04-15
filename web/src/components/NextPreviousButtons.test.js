import { shallow, mount } from 'enzyme';
import React from 'react';
import { t } from '../i18n';

import {
  plain as NextPreviousButtons,
  mapStateToProps,
  mapDispatchToProps
} from './NextPreviousButtons';

import { jumpTo } from '../actions/app';

let mockPush;

jest.mock('react-router-dom', () => {
  mockPush = jest.fn();
  return {
    useHistory: jest.fn().mockReturnValue({ push: mockPush }),
    useRouteMatch: jest.fn().mockReturnValue({ path: '---path---' })
  };
});

const e = {
  stopPropagation: jest.fn(),
  preventDefault: jest.fn()
};

global.scrollTo = jest.fn();

const context = {
  getLinks: pageNavParam => [
    {
      id: 'apd-state-profile',
      label: t('apd.stateProfile.title'),
      onClick: pageNavParam('apd-state-profile-office', 'state-profile')
    },
    {
      id: 'apd-summary',
      label: t('apd.title'),
      onClick: pageNavParam('apd-summary', 'program-summary')
    },
    {
      id: 'previous-activities',
      label: t('previousActivities.title'),
      onClick: pageNavParam('prev-activities-outline', 'previous-activities')
    }
  ],
  getPreviousNextLinks: linksParam => ({
    previousLink: linksParam[0],
    hidePreviousLink: true,
    nextLink: linksParam[2],
    hideNextLink: true
  })
};

const props = {
  activities: [
    { anchor: '#key1', key: 'key 1234' },
    { anchor: '#key2', key: 'key 4321' }
  ],
  activeSection: 'some section',
  jumpTo: jest.fn(),
  context
};

describe('NextPreviousButtons component', () => {
  test('renders correctly', () => {
    const component = shallow(<NextPreviousButtons {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handles previous button clicks', () => {
    const component = mount(<NextPreviousButtons {...props} />);

    component
      .find('Button')
      .at(0)
      .simulate('click', e);

    expect(e.stopPropagation).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();

    // updates nav state, navigates, and scrolls up
    expect(props.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');
    expect(mockPush).toHaveBeenCalledWith('/apd/state-profile');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('handles continue button clicks', () => {
    const component = mount(<NextPreviousButtons {...props} />);

    component
      .find('Button')
      .at(1)
      .simulate('click', e);

    expect(e.stopPropagation).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();

    // updates nav state, navigates, and scrolls up
    expect(props.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');
    expect(mockPush).toHaveBeenCalledWith('/apd/state-profile');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            { key: 'key1', name: 'activity 1' },
            { key: 'key2', name: 'activity 2' }
          ]
        }
      },
      navigation: {
        activeSection: 'where the runners are'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: [
        {
          key: 'key1',
          anchor: 'activity-key1',
          name: 'activity 1'
        },
        {
          key: 'key2',
          anchor: 'activity-key2',
          name: 'activity 2'
        }
      ],
      activeSection: 'where the runners are'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      jumpTo
    });
  });
});
