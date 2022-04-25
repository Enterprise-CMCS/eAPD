import React from 'react';
import { render, screen } from 'apd-testing-library';

import DateField from './DateField';

const defaultProps = {
  onChange: jest.fn(),
  onComponentBlur: jest.fn()
};

const setup = (props = {}) => {
  return render(<DateField {...defaultProps} {...props} />);
};

describe('DateField wrapper component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders properly with defaults', () => {
    // Operation Overlord begins with the invasion of Normandy
    setup({ value: '1944-6-6' });
    expect(screen.getByLabelText('Year')).toHaveValue('1944');
    expect(screen.getByLabelText('Month')).toHaveValue('6');
    expect(screen.getByLabelText('Day')).toHaveValue('6');
  });

  describe('handles invalid dates', () => {
    [
      ['empty date', '', '', '', ''],
      ['month is not set', '2000--4', '2000', '', '4'],
      ['month is out of range', '2000-13-4', '2000', '13', '4'],
      ['day is not set', '2000-3', '2000', '3', ''],
      ['year is not set', '-3-3', '', '3', '3'],
      ['year is 3 digits', '200-3-3', '200', '3', '3'],
      ['year is 5 digits', '20000-3-3', '20000', '3', '3'],
      ['month and day are not set', '2000', '2000', '', ''],
      ['month and year are not set', '--3', '', '', '3'],
      ['day and year are not set', '-3-', '', '3', ''],
      ['day is invalid for month and year', '2019-04-73', '2019', '4', '73'],
      ['day is a leap day but not a leap year', '2019-02-29', '2019', '2', '29']
    ].forEach(([testName, dateValue, year, month, day]) => {
      test(testName, () => {
        setup({ value: dateValue });
        expect(screen.getByLabelText('Year')).toHaveValue(year);
        expect(screen.getByLabelText('Month')).toHaveValue(month);
        expect(screen.getByLabelText('Day')).toHaveValue(day);
      });
    });
  });

  test('passes other props along to design system component', () => {
    // Operation Market Garden begins to liberate portions of the
    // Netherlands and establish a northern invasion point into Germany.
    setup({
      hint: '',
      dayLabel: 'THE DAY',
      value: '1944-9-17'
    });
    expect(screen.getByLabelText('Year')).toHaveValue('1944');
    expect(screen.getByLabelText('Month')).toHaveValue('9');
    expect(screen.getByLabelText('THE DAY')).toHaveValue('17');
  });
});
