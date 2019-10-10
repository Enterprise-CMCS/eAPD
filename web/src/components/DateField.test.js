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

  describe('stitches dates back together properly', () => {
    const component = shallow(
      // Operation Torch begins to relieve pressure on Allied forces
      // in North Africa and open options for an invasion of southern
      // Europe. This represented the opening of the second European
      // front following the German invasion of the Soviet Union.
      <DateField value="1942-11-8" onChange={onChange} />
    );

    const joinDate = component.find('DateField').prop('dateFormatter');

    it('returns an empty string if all parts of the date are missing', () => {
      expect(joinDate({})).toEqual('');
    });

    it('does not prepend zeroes if not necessary', () => {
      // Operation Torch ends in success.
      expect(joinDate({ day: 16, month: 11, year: 1942 })).toEqual(
        '1942-11-16'
      );
    });

    // Erwin Rommel, commander of German forces in Africa, returns to Berlin
    // in defeat. A few weeks later, the German forces remaining in Africa
    // surrendur to the Allies.
    it('prepends zeroes to month and day fields, as appropriate', () => {
      expect(joinDate({ day: 9, month: 3, year: 1943 })).toEqual('1943-03-09');
    });
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
