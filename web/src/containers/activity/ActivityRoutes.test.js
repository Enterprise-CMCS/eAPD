import { shallow } from 'enzyme';
import React from 'react';

import ActivityRoutes from './ActivityRoutes';

jest.mock('react-router-dom', () => ({
  useRouteMatch: jest
    .fn()
    .mockReturnValue({ path: 'this is where the page is' })
}));

describe('activity router page', () => {
  it('renders correctly', () => {
    expect(shallow(<ActivityRoutes activityIndex={3} />)).toMatchSnapshot();
  });
});
