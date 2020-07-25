import { mount, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import {
  NavLink,
  plain as Nav,
  mapStateToProps
} from './Nav';

describe('<NavLink /> component', () => {
  it('renders props and children', () => {
    const props = {
      id: "executive-summary-summary-nav",
      href: "/apd/executive-summary#executive-summary-summary",
      otherThing: true
    }
    const component = shallow(<NavLink {...props}>Activities Summary</NavLink>)
    expect(component.prop('id')).toEqual('executive-summary-summary-nav')
    expect(component.prop('to')).toEqual('/apd/executive-summary#executive-summary-summary')
    expect(component.prop('otherThing')).toEqual(true)
    expect(component.text()).toEqual('Activities Summary')
  });
});

describe('<Nav /> component', () => {
  it('renders correctly', () => {
    const props = {
      links: [
        { id: 'home-nav', label: 'Home', url: '/' },
        { id: 'apd-nav', label: 'View APD', url: '/apd' },
        { id: 'search-nav', label: 'Search', url: '/search' },
        {
          id: 'settings-nav',
          label: 'Settings',
          items: [
            { id: 'profile-nav', label: 'Profile', url: '/me' },
            { id: 'logout-nav', label: 'Log out', url: '/logout' },
          ]
        }
      ],
      selectedId: 'profile-nav'
    }
    const component = mount(
      <Router>
        <Nav {...props} />
      </Router>
    )
    expect(component).toMatchSnapshot()
  });

  it('maps state to props', () => {
    const state = {
      nav: {
        links: ['home-nav', 'search-nav', 'settings-nav'],
        selectedId: 'home-nav'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      links: ['home-nav', 'search-nav', 'settings-nav'],
      selectedId: 'home-nav'
    });
  });
});
