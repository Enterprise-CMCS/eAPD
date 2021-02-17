import React from 'react';
import { renderWithConnection } from 'apd-testing-library';

import { plain as Logout, mapDispatchToProps } from './Logout';
import { logout } from '../actions/auth';

describe('logout component', () => {
  test('calls the logout property and renders nothing', () => {
    const props = { logout: jest.fn() };
    renderWithConnection(<Logout {...props} />);

    expect(props.logout).toHaveBeenCalled();
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ logout });
  });
});
