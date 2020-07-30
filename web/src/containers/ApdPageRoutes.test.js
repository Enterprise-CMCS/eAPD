import { shallow } from 'enzyme';
import React from 'react';

import ApdPageRoutes from './ApdPageRoutes';

const defaultProps = {
  useRouteMatch: jest.fn().mockReturnValue({ path: '/your/current/path' })
};

const setup = (props = {}) => {
  return shallow(<ApdPageRoutes {...defaultProps} {...props} />);
};

describe('<ApdPageRoutes /> component', () => {
  it('renders as expected', () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
