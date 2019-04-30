import { shallow, mount, debug } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { push } from 'connected-react-router';
import { Link, MemoryRouter } from 'react-router-dom';

import { plain as Header, mapStateToProps, mapDispatchToProps } from './Header';

describe('Header component', () => {
  it('renders correctly when the dropdown is closed and the page is top level', ()=> {
    const component = shallow(
      <Header
        authenticated
        currentUser={{ role: "admin", state: { id: "wa", name: "Washington" }, username: "frasiercrane@kacl.com"}}
        isAdmin
        pushRoute={() => {}}
        ariaExpanded={false}
        showSiteTitle
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('opens and closes the dropdown when clicked', () => {
    const component = shallow(
      <Header
        authenticated
        currentUser={{ role: "admin", state: { id: "wa", name: "Washington" }, username: "frasiercrane@kacl.com"}}
        isAdmin
        pushRoute={() => {}}
        ariaExpanded={false}
        showSiteTitle
      />
    );
    component.find('.nav--dropdown__trigger').simulate('click');
    expect(component).toMatchSnapshot();
    expect(component.state().ariaExpanded).toBeTruthy();

    component.find('.nav--dropdown__trigger').simulate('click');
    expect(component.state().ariaExpanded).toBeFalsy();
  });

  it('renders the admin home title when an admin user is at a secondary page', () => {
    const component = mount(
      <MemoryRouter>
        <Header
          authenticated
          currentUser={{ role: "admin", state: { id: "wa", name: "Washington" }, username: "frasiercrane@kacl.com"}}
          isAdmin
          pushRoute={() => {}}
          ariaExpanded={false}
          showSiteTitle={false}
        />
      </MemoryRouter>
    );
    expect(component.find('.site-title').text()).toBe('Admin dashboard');
  });

  it('renders the state user home title when a state user is at a secondary page', () => {
    const component = mount(
      <MemoryRouter>
        <Header
          authenticated
          currentUser={{ role: "admin", state: { id: "wa", name: "Washington" }, username: "frasiercrane@kacl.com"}}
          isAdmin={false}
          pushRoute={() => {}}
          ariaExpanded={false}
          showSiteTitle={false}
        />
      </MemoryRouter>
    );
    expect(component.find('.site-title').text()).toBe('WA APD home');
  });

  it('goes to the logout route', () => {
    const event = { preventDefault: sinon.spy() };
    const pushRouteProp = sinon.spy();

    const component = shallow(
     <Header
        authenticated
        currentUser={{ role: "admin", state: { id: "wa", name: "Washington" }, username: "frasiercrane@kacl.com"}}
        isAdmin={false}
        pushRoute={pushRouteProp}
        ariaExpanded={false}
        showSiteTitle={false}
      />
    );

    component.find('Button').simulate('click', event);

    expect(pushRouteProp.calledWith('/logout')).toBeTruthy();
    expect(event.preventDefault.called).toBeTruthy();
  });

  it('maps state to props', () => {
    const state = {
      auth: {
        authenticated: 'some value',
        user: {
          role: 'admin'
        }
      },
      user: {
        data: {
          role: 'admin'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({ authenticated: 'some value', currentUser: { user: { role: 'admin' }}, isAdmin: true});
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ pushRoute: push });
  });
});
