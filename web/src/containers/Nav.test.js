import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { plain as Nav, mapStateToProps } from './Nav';

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
            { id: 'logout-nav', label: 'Log out', url: '/logout' }
          ]
        }
      ],
      selectedId: 'profile-nav'
    };
    const component = mount(
      <Router>
        <Nav {...props} />
      </Router>
    );
    expect(component).toMatchSnapshot();
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
