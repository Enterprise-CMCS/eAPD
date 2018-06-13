import { shallow } from 'enzyme';
import React from 'react';

import SidebarLink from './SidebarLink';

describe('SidebarLink component', () => {
  test('renders correctly in the default case', () => {
    const component = shallow(<SidebarLink>link text</SidebarLink>);
    expect(component).toMatchSnapshot();
  });

  test('renders link correctly if an anchor is given', () => {
    const component = shallow(
      <SidebarLink anchor="moop">link text</SidebarLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if link is active', () => {
    const component = shallow(<SidebarLink isActive>link text</SidebarLink>);
    expect(component).toMatchSnapshot();
  });
});
