import { shallow } from 'enzyme';
import React from 'react';

import DateField from './DateField';

describe('DateField banner component', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('renders properly with defaults', () => {
    expect(
      shallow(<DateField value="2015-3-17" onChange={onChange} />)
    ).toMatchSnapshot();
  });

  test('passes other props along to design system component', () => {
    expect(
      shallow(
        <DateField
          hint=""
          dayLabel="THE DAY"
          value="2015-3-17"
          onChange={onChange}
        />
      )
    ).toMatchSnapshot();
  });

  test('handles changes', () => {
    const component = shallow(
      <DateField value="2015-3-17" onChange={onChange} />
    );
    component.find('DateField').simulate('change', 'moop moop');
    expect(onChange).toHaveBeenCalledWith('moop moop');
  });
});
