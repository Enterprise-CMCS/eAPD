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
const pageNav = jest.fn();

const links = [
  {
    id: 'apd-state-profile',
    label: t('apd.stateProfile.title'),
    onClick: pageNav('apd-state-profile-office', 'state-profile'),
  },
  {
    id: 'apd-summary',
    label: t('apd.title'),
    onClick: pageNav('apd-summary', 'program-summary')
  },
  {
    id: 'previous-activities',
    label: t('previousActivities.title'),
    onClick: pageNav('prev-activities-outline', 'previous-activities'),
  }
];

const testContext = { 
  getLinks: jest.fn().mockReturnValue(links),
  getPreviousNextLinks: jest.fn().mockReturnValue([
    links[0],
    true,
    links[2],
    true
  ])
};

const deepTestContext = { 
  getLinks: (pageNav) => ([   // eslint-disable-line no-shadow
    {
      id: 'apd-state-profile',
      label: t('apd.stateProfile.title'),
      onClick: pageNav('apd-state-profile-office', 'state-profile'),
    },
    {
      id: 'apd-summary',
      label: t('apd.title'),
      onClick: pageNav('apd-summary', 'program-summary')
    },
    {
      id: 'previous-activities',
      label: t('previousActivities.title'),
      onClick: pageNav('prev-activities-outline', 'previous-activities'),
    }
  ]),
  getPreviousNextLinks: (links) => ([   // eslint-disable-line no-shadow
    links[0],
    true,
    links[2],
    true
  ])
};

const deepTestProps = {
  activities: [
    { anchor: '#key1', key: 'key 1234' },
    { anchor: '#key2', key: 'key 4321' }
  ],
  activeSection: 'some section',
  jumpTo: jest.fn(),
  context: deepTestContext
};

describe('NextPreviousButtons component', () => {

  test('renders correctly', () => {
    const props = {
      activities: [
        { anchor: '#key1', key: 'key 1234' },
        { anchor: '#key2', key: 'key 4321' }
      ],
      activeSection: 'some section',
      jumpTo: jest.fn(),
      place: { id: 'place id', name: 'place name' },
      context: testContext
    };
  
    const component = shallow(<NextPreviousButtons {...props} />);

    expect(component).toMatchSnapshot();
    expect(props.context.getLinks).toHaveBeenCalled();
    expect(props.context.getPreviousNextLinks).toHaveBeenCalled();
  });

  it('handles previous button clicks', () => {
    const component = mount(<NextPreviousButtons {...deepTestProps} />);

    component.find('Button')
      .at(0)
      .simulate("click", e);

    expect(pageNav).toHaveBeenCalledWith('apd-state-profile-office', 'state-profile');

    expect(e.stopPropagation).toHaveBeenCalled();
    expect(e.preventDefault).toHaveBeenCalled();

    // updates nav state, navigates, and scrolls up
    expect(deepTestProps.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');
    expect(mockPush).toHaveBeenCalledWith('/apd/state-profile');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('handles continue button clicks', () => {
    const component = mount(<NextPreviousButtons {...deepTestProps} />);

    component.find('Button')
      .at(1)
      .simulate("click", e);

      expect(pageNav).toHaveBeenCalledWith('apd-summary', 'program-summary');

      expect(e.stopPropagation).toHaveBeenCalled();
      expect(e.preventDefault).toHaveBeenCalled();
  
      // updates nav state, navigates, and scrolls up
      expect(deepTestProps.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');
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
