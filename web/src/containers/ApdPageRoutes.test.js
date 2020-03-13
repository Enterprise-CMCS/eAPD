import { shallow } from 'enzyme';
import React from 'react';

import ApdPageRoutes from './ApdPageRoutes';

jest.mock('react-router-dom', () => ({
  useRouteMatch: jest
    .fn()
    .mockReturnValue({ path: 'this is where the page is' })
}));

describe('APD page router', () => {
  it('renders as expected', () => {
    expect(shallow(<ApdPageRoutes />)).toMatchSnapshot();
  });
});
