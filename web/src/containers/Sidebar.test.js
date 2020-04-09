import { shallow, mount } from 'enzyme';
import React from 'react';

import {
  plain as Sidebar,
  mapStateToProps,
  mapDispatchToProps
} from './Sidebar';
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

jest.mock('../contexts/LinksContextProvider', () => { 
  const contextObject = { 
    getLinks: (pageNav, anchorNav) => ([
      {
        id: 'apd-state-profile',
        label: 'apd.stateProfile.title',
        onClick: pageNav('apd-state-profile-office', 'state-profile'),
        children: [
          {
            id: 'apd-state-profile-office',
            label: 'apd.stateProfile.directorAndAddress.title',
            onClick: anchorNav('apd-state-profile-office'),
          },
          {
            id: 'apd-state-profile-key-personnel',
            label: 'apd.stateProfile.keyPersonnel.title',
            onClick: anchorNav('apd-state-profile-key-personnel'),
          }
        ]
      },
      {
        id: 'apd-summary',
        label: 'apd.title',
        onClick: pageNav('apd-summary', 'program-summary')
      }
    ]), 
    getPreviousNextLinks: jest.fn() 
  } 
  return {
    LinksContextConsumer: ({ children }) => { return children(contextObject); }
  }
});

describe('Sidebar component', () => {
  const props = {
    activities: [
      { anchor: '#key1', key: 'key 1234' },
      { anchor: '#key2', key: 'key 4321' }
    ],
    activeSection: 'some section',
    jumpTo: jest.fn(),
    place: { id: 'place id', name: 'place name' }
  };

  beforeEach(() => {
    global.scrollTo.mockReset();
    if (mockPush) {
      mockPush.mockReset();
    }
    props.jumpTo.mockReset();
  });

  it('renders correctly', () => {
    expect(shallow(<Sidebar {...props} />)).toMatchSnapshot();
  });

  it('uses the PNG file extension for territories (these are not SVGs)', () => {
    expect(
      shallow(
        <Sidebar {...props} place={{ id: 'vi', name: 'U.S. Virgin Islands' }} />
      )
    ).toMatchSnapshot();
  });

  it('renders the active section with its children open', () => {
    expect(
      shallow(<Sidebar {...props} activeSection="proposed-budget" />)
    ).toMatchSnapshot();
  });

  it('renders the active section correctly if it is an activity section', () => {
    expect(
      shallow(<Sidebar {...props} activeSection="activity-key 1234-okrs" />)
    ).toMatchSnapshot();
  });

  it('navigates correctly to a section that is on another page', () => {
    const item = mount(<Sidebar {...props} />)
      .find('VerticalNav')
      .prop('items')[0];

    // This is just here so the test fails fast if we reorder the sidebar. This
    // test is dependent on the order of the items in the sidebar.
    expect(item.id).toEqual('apd-state-profile');

    const e = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };

    item.onClick(e);

    // Click event is canceled so the browser doesn't do any navigation itself
    expect(e.preventDefault).toHaveBeenCalled();
    expect(e.stopPropagation).toHaveBeenCalled();

    // We update the navigation redux state with the ID of the section that
    // should be highlighted in the sidebar
    expect(props.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');

    // We navigate
    expect(mockPush).toHaveBeenCalledWith('---path---/state-profile');

    // We scroll to the top of the page
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('navigates correctly to a subsection that is within the current page', () => {
    const item = mount(
      <Sidebar {...props} activeSection="apd-state-profile" />
    )
      .find('VerticalNav')
      .prop('items')[0].children[0];

    // This is just here so the test fails fast if we reorder the sidebar. This
    // test is dependent on the order of the items in the sidebar.
    expect(item.id).toEqual('apd-state-profile-office');

    item.onClick();

    // We update the navigation redux state with the ID of the section that
    // should be highlighted in the sidebar
    expect(props.jumpTo).toHaveBeenCalledWith('apd-state-profile-office');
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
