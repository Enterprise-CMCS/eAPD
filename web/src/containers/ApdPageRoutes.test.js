import { shallow } from 'enzyme';
import React from 'react';

import ApdPageRoutes from './ApdPageRoutes';

describe('APD page router', () => {
  it('renders as expected', () => {
    expect(shallow(<ApdPageRoutes />)).toMatchSnapshot();
  });
});
