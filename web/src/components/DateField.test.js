import { shallow } from 'enzyme';
import React from 'react';

import DateField from './DateField';

describe('DateField wrapper component', () => {
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

  describe('handles invalid dates', () => {
    [
      ['empty date', ''],
      ['month is not set', '2000--4'],
      ['month is out of range', '2000-13-4'],
      ['day is not set', '2000-3'],
      ['year is not set', '-3-3'],
      ['year is 3 digits', '200-3-3'],
      ['year is 5 digits', '20000-3-3'],
      ['month and day are not set', '2000'],
      ['month and year are not set', '--3'],
      ['day and year are not set', '-3-'],
      ['day is invalid for month and year', '2019-04-73'],
      ['day is a leap day but not a leap year', '2019-02-29']
    ].forEach(([testName, dateValue]) => {
      test(testName, () => {
        expect(
          shallow(<DateField value={dateValue} onChange={onChange} />)
        ).toMatchSnapshot();
      });
    });
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
});
