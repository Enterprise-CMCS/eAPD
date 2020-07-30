import { shallow } from 'enzyme';
import React from 'react';

import ActivityRoutes from './ActivityRoutes';

const defaultProps = {
  activityIndex: 3,
  useRouteMatch: jest.fn().mockReturnValue({ path: '/your/current/path' })
};

const setup = (props = {}) => {
  return shallow(<ActivityRoutes {...defaultProps} {...props} />);
};

describe('<ActivityRoutes /> component', () => {
  it('renders as expected', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
