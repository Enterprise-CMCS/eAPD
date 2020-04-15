import { shallow } from 'enzyme';
import React from 'react';
import SecondaryNav from './SecondaryNav';

describe('Secondary Nav component', () => {
  it('renders correctly', () => {
    expect(shallow(<SecondaryNav />).dive()).toMatchSnapshot();
  });
});
