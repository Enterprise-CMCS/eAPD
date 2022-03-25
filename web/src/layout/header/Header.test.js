import { shallow } from 'enzyme';
import React from 'react';

import { plain as Header, mapStateToProps } from './Header';

const initialProps = {
  ariaExpanded: false,
  authenticated: true,
  isFedAdmin: false,
  currentUser: {
    role: 'eAPD System Admin',
    state: { id: 'wa', name: 'Washington' },
    username: 'frasiercrane@kacl.com'
  },
  showSiteTitle: true
};

const setup = props => shallow(<Header {...initialProps} {...props} />);

describe('Header component', () => {
  it('renders correctly when the dropdown is closed and the page is top level', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it('opens and closes the dropdown when clicked ', () => {
    const component = setup();

    jest.spyOn(document, 'addEventListener');
    jest.spyOn(document, 'removeEventListener');

    component.find('.nav--dropdown__trigger').simulate('click');
    expect(component).toMatchSnapshot();
    expect(component.state().ariaExpanded).toBeTruthy();
    expect(document.addEventListener).toHaveBeenCalled();
    expect(document.addEventListener.mock.calls[0][0]).toEqual('click');

    const handler = document.addEventListener.mock.calls[0][1];

    component.find('.nav--dropdown__trigger').simulate('click');
    expect(component.state().ariaExpanded).toBeFalsy();
    expect(document.removeEventListener).toHaveBeenCalled();
    expect(document.removeEventListener.mock.calls[0][0]).toEqual('click');
    expect(document.removeEventListener.mock.calls[0][1]).toEqual(handler);
  });

  it('handles outside click events', () => {
    // Create an instance of the component object but don't mount it. This
    // breaks us out of all the React requirements, which is handy because
    // we don't actually need them for these tests.
    const component = new Header({
      authenticated: true,
      currentUser: {
        role: 'admin',
        state: { id: 'wa', name: 'Washington' },
        username: 'frasiercrane@kacl.com'
      },
      ariaExpanded: false,
      showSiteTitle: true
    });

    // React sets the node for us, so since we're not Reacting, do it manually.
    // In the first case, make the contains fn return false.
    component.node = { current: { contains: jest.fn(() => false) } };

    jest.spyOn(document, 'removeEventListener');
    // By default, spyOn calls the real method as well, but that'll cause a
    // React error here because the component isn't mounted
    jest.spyOn(component, 'setState').mockImplementation(() => {});

    // Call the method under test
    component.handleOutsideClick({});

    // Make sure the state was set and the event handler was removed.
    expect(component.setState).toHaveBeenCalled();
    expect(component.setState.mock.calls[0][0]).toEqual({
      ariaExpanded: false
    });
    expect(document.removeEventListener).toHaveBeenCalled();
    expect(document.removeEventListener.mock.calls[0][0]).toEqual('click');
    // we can't check the function because of weird binding

    // Reset the mocks
    document.removeEventListener.mockClear();
    component.setState.mockClear();

    // Change the node contains function to return true this time.
    component.node.current.contains = jest.fn(() => true);

    component.handleOutsideClick({});

    expect(component.setState).not.toHaveBeenCalled();
    expect(document.removeEventListener).not.toHaveBeenCalled();
  });

  it('renders the admin home title when an admin user is at a secondary page', () => {
    const component = setup({ showSiteTitle: false });
    expect(component).toMatchSnapshot();
  });

  it('renders the state admin link when user has required permissions', () => {
    const currentUser = {
      role: 'eAPD State Admin',
      state: { id: 'wa', name: 'Washington' },
      username: 'frasiercrane@kacl.com'
    };
    const component = setup({
      currentUser,
      canViewStateAdmin: true,
      showSiteTitle: false
    });
    expect(component).toMatchSnapshot();
  });

  it('maps state to props for an admin', () => {
    const state = {
      auth: {
        authenticated: 'some value',
        user: {
          role: 'admin'
        }
      },
      user: {
        data: {
          role: 'admin',
          state: { id: 'md', name: 'Maryland' }
        }
      },
      router: {
        location: {
          pathname: 'pathname'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      authenticated: 'some value',
      currentUser: {
        role: 'admin',
        state: { id: 'md', name: 'Maryland' }
      },
      isFedAdmin: false,
      currentState: { id: 'md', name: 'Maryland' },
      canViewStateAdmin: null,
      pathname: 'pathname'
    });
  });

  it('maps state to props for a federal admin', () => {
    const state = {
      auth: {
        authenticated: 'some value',
        user: {
          role: 'eAPD Federal Admin'
        }
      },
      user: {
        data: {
          role: 'eAPD Federal Admin',
          state: { id: 'md', name: 'Maryland' }
        }
      },
      router: {
        location: {
          pathname: 'pathname'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      authenticated: 'some value',
      currentUser: {
        role: 'eAPD Federal Admin',
        state: { id: 'md', name: 'Maryland' }
      },
      isFedAdmin: true,
      currentState: { id: 'md', name: 'Maryland' },
      canViewStateAdmin: null,
      pathname: 'pathname'
    });
  });
});
