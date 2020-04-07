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

global.scrollTo = jest.fn();
const pageNav = jest.fn();

const context = { 
  getLinks: jest.fn(),
  getPreviousNextLinks: jest.fn().mockReturnValue([
    {
      id: 'apd-state-profile',
      label: t('apd.stateProfile.title'),
      onClick: pageNav('apd-state-profile-office', 'state-profile'),
      children: [
        {
          id: 'apd-state-profile-office',
          label: t('apd.stateProfile.directorAndAddress.title')
        },
        {
          id: 'apd-state-profile-key-personnel',
          label: t('apd.stateProfile.keyPersonnel.title')
        }
      ]
    },
    true,
    {
      id: 'apd-summary',
      label: t('apd.title'),
      onClick: pageNav('apd-summary', 'program-summary')
    },
    true
  ])
};

const e = {
  stopPropagation: jest.fn(),
  preventDefault: jest.fn()
};

describe('NextPreviousButtons component', () => {
  const props = {
    activities: [
      { anchor: '#key1', key: 'key 1234' },
      { anchor: '#key2', key: 'key 4321' }
    ],
    activeSection: 'some section',
    jumpTo: jest.fn(),
    place: { id: 'place id', name: 'place name' },
    context: context
  };

  test('renders correctly', () => {
    const component = shallow(<NextPreviousButtons {...props} />);
    expect(component).toMatchSnapshot();
    expect(context.getLinks).toHaveBeenCalled();
    expect(context.getPreviousNextLinks).toHaveBeenCalled();
  });

  it('handles previous button clicks', () => {
    const component = shallow(<NextPreviousButtons {...props} />);
    expect(component).toMatchSnapshot();

    component.find('Button')
      .at(0)
      .simulate("click", e);

    expect(pageNav).toHaveBeenCalledWith('apd-state-profile-office', 'state-profile');
/*
    // cancels the click
    expect(e.stopPropagation).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();

    // updates nav state, navigates, and scrolls up
    expect(props.jumpAction).toHaveBeenCalledWith('activity-a1-overview');
    expect(mockPush).toHaveBeenCalledWith('/apd/activity/0');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
*/
  });

  it('handles continue button clicks', () => {
    const component = shallow(<NextPreviousButtons {...props} />);
    expect(component).toMatchSnapshot();

    component.find('Button')
      .at(1)
      .simulate("click", e);

      expect(pageNav).toHaveBeenCalledWith('apd-summary', 'program-summary');
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
