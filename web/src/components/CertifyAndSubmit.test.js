import { shallow } from 'enzyme';
import React from 'react';

import CertifyAndSubmit from './CertifyAndSubmit';

describe('CertifyAndSubmit component', () => {
  test('renders correctly', () => {
    const component = shallow(<CertifyAndSubmit />);
    expect(component).toMatchSnapshot();
  });
});
