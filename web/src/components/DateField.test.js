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
      // Operation Overlord begins with the invasion of Normandy
      shallow(<DateField value="1944-6-6" onChange={onChange} />)
    ).toMatchSnapshot();
  });

  test('passes other props along to design system component', () => {
    expect(
      shallow(
        <DateField
          hint=""
          dayLabel="THE DAY"
          // Operation Market Garden begins to liberate portions of the
          // Netherlands and establish a northern invasion point into Germany.
          value="1944-9-17"
          onChange={onChange}
        />
      )
    ).toMatchSnapshot();
  });

  test('handles changes', () => {
    const component = shallow(
      // Allied forces halt Operation Market Garden, unable to cross the Rhine
      // River. However, they succeeded in liberating several Dutch cities and
      // disrupting V-2 rocket launches.
      <DateField value="1944-9-25" onChange={onChange} />
    );
    component.find('DateField').simulate('change', 'moop moop');
    expect(onChange).toHaveBeenCalledWith('moop moop');
  });
});
