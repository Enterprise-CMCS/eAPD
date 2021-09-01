import { shallow } from 'enzyme';
import React from 'react';

import NavLink from './NavLink';

describe('<NavLink /> (for use within @cms-gov/ds components)', () => {
  it('renders props and children', () => {
    const props = {
      id: 'executive-summary-summary-nav',
      href:
        '/apd/0123456789abcdef01234567/executive-summary#executive-summary-summary',
      otherThing: true
    };
    const component = shallow(<NavLink {...props}>Activities Summary</NavLink>);
    expect(component.prop('id')).toEqual('executive-summary-summary-nav');
    expect(component.prop('to')).toEqual(
      '/apd/0123456789abcdef01234567/executive-summary#executive-summary-summary'
    );
    expect(component.prop('otherThing')).toEqual(true);
    expect(component.text()).toEqual('Activities Summary');
  });
});
