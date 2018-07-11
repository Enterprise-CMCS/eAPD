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
    const component = shallow(
      <SidebarLink hash="moop" anchor="moop">
        link text
      </SidebarLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if link has sub-links', () => {
    const component = shallow(
      <SidebarLink sub={[{ id: 1, name: 'child' }]}>link text</SidebarLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if link is collapsed', () => {
    const component = shallow(
      <SidebarLink expanded={false} sub={[{ id: 1, name: 'child' }]}>
        link text
      </SidebarLink>
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if link is expanded', () => {
    const component = shallow(
      <SidebarLink expanded sub={[{ id: 1, name: 'child' }]}>
        link text
      </SidebarLink>
    );
    expect(component).toMatchSnapshot();
  });
});
