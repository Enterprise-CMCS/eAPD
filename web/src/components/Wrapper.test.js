import { shallow } from 'enzyme';
import React from 'react';

import Wrapper from './Wrapper';

describe('Wrapper component', () => {
  test('renders correctly in dev mode', () => {
    const component = shallow(<Wrapper isDev>child content</Wrapper>);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly in non-dev mode', () => {
    const component = shallow(<Wrapper isDev={false}>child content</Wrapper>);
    expect(component).toMatchSnapshot();
  });
});
